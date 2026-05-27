import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/de/portofoliu", destination: "/portofoliu", permanent: false },
      { source: "/de/blog",       destination: "/blog",       permanent: false },
      { source: "/de/blog/:slug", destination: "/blog/:slug", permanent: false },
    ];
  },
};

export default nextConfig;
