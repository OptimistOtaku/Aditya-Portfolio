/** @type {import('next').NextConfig} */
module.exports = {
  distDir: process.env.PORTFOLIO_DIST_DIR || '.next',
  experimental: { cpus: 2 },
  async headers() {
    return [{
      source: '/social/player.html',
      headers: [
        { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://x.com https://*.x.com https://twitter.com https://*.twitter.com" },
        { key: 'X-Robots-Tag', value: 'noindex' },
      ],
    }];
  },
};
