import { ImageResponse } from "next/og";

// Deliberately no `export const runtime = "edge"` — this repo avoids
// anything not verified on Amplify's WEB_COMPUTE adapter (see Key
// decisions in CLAUDE.md), and next/og's ImageResponse works fine on the
// default Node.js runtime, so there's no reason to opt into edge here.
export const alt = "Derik Schneider, Front-End Engineer & Product Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stack = ["Next.js", "TypeScript", "Tailwind", "Contentful", "AWS"];

async function loadSpaceGrotesk(weight: 500 | 700) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@${weight}`;
  const css = await fetch(cssUrl, {
    headers: {
      // Google serves woff2-only to modern UAs and ttf to older ones —
      // Satori (which ImageResponse uses) can't parse woff2, so ask as an
      // old browser to get a ttf url back.
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.7 Safari/534.34",
    },
  }).then((res) => res.text());
  const fontUrl = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!fontUrl) throw new Error("Could not resolve Space Grotesk font URL");
  const fontData = await fetch(fontUrl).then((res) => res.arrayBuffer());
  return fontData;
}

export default async function OpengraphImage() {
  let fonts: { name: string; data: ArrayBuffer; weight: 500 | 700; style: "normal" }[] = [];
  try {
    const [regular, bold] = await Promise.all([loadSpaceGrotesk(500), loadSpaceGrotesk(700)]);
    fonts = [
      { name: "Space Grotesk", data: regular, weight: 500, style: "normal" },
      { name: "Space Grotesk", data: bold, weight: 700, style: "normal" },
    ];
  } catch {
    // Google Fonts fetch failed (offline build, rate limit, etc.) — fall
    // back to Satori's built-in default font rather than failing the
    // whole image render.
    fonts = [];
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#0b0b0e",
          fontFamily: fonts.length ? "Space Grotesk" : undefined,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#e0a940",
            fontWeight: 500,
          }}
        >
          <div style={{ width: 10, height: 10, background: "#e0a940", borderRadius: 999 }} />
          Internal move: Lead Full Stack Engineer
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 96, fontWeight: 700, color: "#eeedf4", lineHeight: 1 }}>
            Derik Schneider
          </div>
          <div style={{ fontSize: 34, fontWeight: 500, color: "#a3a3ad" }}>
            Front-End Engineer &amp; Product Designer
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12 }}>
            {stack.map((s) => (
              <div
                key={s}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: "1px solid #35353d",
                  fontSize: 20,
                  color: "#eeedf4",
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 22, color: "#a3a3ad", letterSpacing: 1 }}>
            work.derikschneider.com
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
