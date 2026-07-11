import { Pool, type QueryResultRow } from "pg";

/**
 * Postgres access layer.
 * Connection is configured via DATABASE_URL.
 * The pool is cached on globalThis to survive Next.js HMR in dev.
 */

const globalForPg = globalThis as unknown as { __pgPool?: Pool };

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set");
  }
  if (!globalForPg.__pgPool) {
    globalForPg.__pgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }
  return globalForPg.__pgPool;
}

async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = [],
) {
  const pool = getPool();
  return pool.query<T>(text, params);
}

let schemaReady = false;

/** Create the leads table if it does not exist (idempotent). */
export async function ensureSchema() {
  if (schemaReady) return;
  await query(`
    CREATE TABLE IF NOT EXISTS leads (
      id            BIGSERIAL PRIMARY KEY,
      full_name     TEXT NOT NULL,
      phone         TEXT NOT NULL,
      level         TEXT NOT NULL,
      utm_source    TEXT,
      utm_medium    TEXT,
      utm_campaign  TEXT,
      utm_content   TEXT,
      utm_term      TEXT,
      angle         TEXT,
      status        TEXT NOT NULL DEFAULT 'new',
      submitted_at  TIMESTAMPTZ,
      ip            TEXT,
      user_agent    TEXT,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);
  schemaReady = true;
}

export interface NewLead {
  fullName: string;
  phone: string;
  level: string;
  submittedAt?: string;
  attribution?: Record<string, unknown>;
  ip?: string | null;
  userAgent?: string | null;
}

export async function insertLead(lead: NewLead) {
  await ensureSchema();
  const a = lead.attribution ?? {};
  const str = (v: unknown) => (typeof v === "string" && v.length > 0 ? v : null);
  await query(
    `INSERT INTO leads
       (full_name, phone, level, utm_source, utm_medium, utm_campaign,
        utm_content, utm_term, angle, submitted_at, ip, user_agent)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
    [
      lead.fullName,
      lead.phone,
      lead.level,
      str(a.utm_source),
      str(a.utm_medium),
      str(a.utm_campaign),
      str(a.utm_content),
      str(a.utm_term),
      str(a.angle),
      lead.submittedAt ?? null,
      lead.ip ?? null,
      lead.userAgent ?? null,
    ],
  );
}

export interface LeadRow {
  id: string;
  full_name: string;
  phone: string;
  level: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: string;
  submitted_at: string | null;
  created_at: string;
}

export async function listLeads(limit = 500): Promise<LeadRow[]> {
  await ensureSchema();
  const res = await query<LeadRow>(
    `SELECT id, full_name, phone, level, utm_source, utm_medium, utm_campaign,
            status, submitted_at, created_at
       FROM leads
      ORDER BY created_at DESC
      LIMIT $1`,
    [limit],
  );
  return res.rows;
}

export interface LeadStats {
  total: number;
  today: number;
  byStatus: Record<string, number>;
}

export async function getLeadStats(): Promise<LeadStats> {
  await ensureSchema();
  const totalRes = await query<{ count: string }>(`SELECT count(*) FROM leads`);
  const todayRes = await query<{ count: string }>(
    `SELECT count(*) FROM leads WHERE created_at::date = now()::date`,
  );
  const statusRes = await query<{ status: string; count: string }>(
    `SELECT status, count(*) FROM leads GROUP BY status`,
  );
  const byStatus: Record<string, number> = {};
  for (const r of statusRes.rows) byStatus[r.status] = Number(r.count);
  return {
    total: Number(totalRes.rows[0]?.count ?? 0),
    today: Number(todayRes.rows[0]?.count ?? 0),
    byStatus,
  };
}

const ALLOWED_STATUS = ["new", "contacted", "converted", "lost"] as const;
export type LeadStatus = (typeof ALLOWED_STATUS)[number];

export function isValidStatus(s: string): s is LeadStatus {
  return (ALLOWED_STATUS as readonly string[]).includes(s);
}

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await ensureSchema();
  await query(`UPDATE leads SET status = $1 WHERE id = $2`, [status, id]);
}
