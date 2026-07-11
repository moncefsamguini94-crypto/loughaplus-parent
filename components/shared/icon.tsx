import {
  BookOpen,
  Building2,
  CheckCircle2,
  Gift,
  GraduationCap,
  Handshake,
  Headphones,
  Laptop,
  Mic,
  PenLine,
  Plane,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  BookOpen,
  Building2,
  CheckCircle2,
  Gift,
  GraduationCap,
  Handshake,
  Headphones,
  Laptop,
  Mic,
  PenLine,
  Plane,
  ShieldCheck,
  Sparkles,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = registry[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden="true" />;
}
