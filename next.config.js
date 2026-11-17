/** @type {import('next').NextConfig} */
module.exports = {
  distDir: process.env.PORTFOLIO_DIST_DIR || '.next',
  experimental: { cpus: 2 },
};
