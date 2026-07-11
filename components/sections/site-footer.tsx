import { Facebook, Instagram, Music2 } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { footer, site } from "@/lib/content";

const socials = [
  { href: site.socials.instagram, label: "Instagram", Icon: Instagram },
  { href: site.socials.facebook, label: "Facebook", Icon: Facebook },
  { href: site.socials.tiktok, label: "TikTok", Icon: Music2 },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container flex flex-col items-center gap-4 py-8 text-center md:flex-row md:justify-between md:text-start">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <Logo />
          <p className="text-[14px] font-medium text-brand-900">{footer.tagline}</p>
          <p className="text-[12px] text-muted-foreground">{site.privacyNote}</p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              data-track="social_click"
              data-track-label={label}
              className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-brand-700 transition-colors hover:bg-brand-100"
            >
              <Icon className="size-5" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border pb-24 md:pb-0">
        <p className="container py-4 text-center text-[12px] text-muted-foreground">
          © {new Date().getFullYear()} {site.name} · {footer.rights}
        </p>
      </div>
    </footer>
  );
}
