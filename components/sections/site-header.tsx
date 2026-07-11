import { Logo } from "@/components/shared/logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black">
      <div className="container flex h-16 items-center justify-center">
        <a href="#" aria-label="LOUGHA PLUS">
          <Logo />
        </a>
      </div>
    </header>
  );
}
