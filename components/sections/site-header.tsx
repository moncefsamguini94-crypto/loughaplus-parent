export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full bg-black">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/lougha-plus-header-banner.png"
        alt="LOUGHA PLUS — language courses"
        className="mx-auto block h-auto w-full max-h-[100px] object-contain object-center sm:max-h-[120px]"
        loading="eager"
        decoding="async"
      />
    </header>
  );
}
