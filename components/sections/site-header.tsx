import { Logo } from "@/components/shared/logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-center">
        <a href="#" aria-label="LOUGHA PLUS">
          <Logo />
        </a>
      </div>
    </header>
  );
}
