/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
  },
  // Force dynamic rendering globally to allow Clerk pages to run at request-time
  dynamic: 'force-dynamic',
};
