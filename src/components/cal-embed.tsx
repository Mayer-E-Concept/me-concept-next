"use client";
import Script from "next/script";

export function CalEmbed({ locale = "ro" }: { locale?: "ro" | "de" }) {
  const id = `cal-inline-${locale}`;

  function onLoad() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Cal = (window as any).Cal;
    if (!Cal) return;
    Cal("init", id, { origin: "https://cal.eu" });
    Cal.ns[id]("inline", {
      elementOrSelector: `#${id}`,
      config: { layout: "month_view", theme: "dark" },
      calLink: "mayerconcept/30min",
    });
    Cal.ns[id]("ui", {
      styles: { branding: { brandColor: "#C5895B" } },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }

  return (
    <>
      <Script
        src="https://app.cal.eu/embed/embed.js"
        strategy="lazyOnload"
        onLoad={onLoad}
      />
      <div id={id} style={{ width: "100%", minHeight: 700 }} />
    </>
  );
}
