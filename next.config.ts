import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Serve images as plain static files instead of routing them through
    // Next's /_next/image?url=... optimizer.
    //
    // This is not a performance preference — it's a delivery requirement.
    // Corporate web filters block that endpoint: a URL taking a `url=`
    // parameter and returning remote bytes pattern-matches an open proxy /
    // SSRF vector. Confirmed 2026-08-04 on Capital One's network, which is
    // exactly where this site's audience will view it — the raw file loaded
    // fine while the optimizer URL was refused outright by the firewall.
    // Every <Image> on the site failed there while text/CSS rendered fine.
    //
    // Because files now ship byte-for-byte as they sit in public/, they are
    // pre-compressed to WebP q85 rather than relying on the optimizer to do
    // it at request time. Keep new imagery in that format for the same
    // reason — nothing downstream will shrink it now.
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        // The resume PDF was published at this path from 2026-07-29 until
        // 2026-08-05, when Derik replaced the file under a new name. The old
        // path was linked from the live /resume page for that week, so
        // anything saved or shared in that window points here. Redirect
        // rather than 404 — and it means an old link now serves the CURRENT
        // resume, which is the whole point.
        source: "/resume/derik-schneider-resume.pdf",
        destination: "/resume/derik_schneider_resume.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
