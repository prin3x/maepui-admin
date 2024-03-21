/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    // For Local Server
    
    //  API_PROD_URL: "https://fastkart-admin-json.vercel.app/api/",

   API_PROD_URL: "http://localhost:8080/api/",

    // API_PROD_URL: "https://laravel.pixelstrap.net/fastkart/api",
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/en/dashboard",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/en/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1:8000",
      },
      {
        protocol: "https",
        hostname: "fastkart-admin-json.vercel.app",
      },
      {
        protocol: "https",
        hostname: "laravel.pixelstrap.net",
      },
      {
        protocol: "https",
        hostname: "s3.ap-southeast-1.amazonaws.com",
      },
      {
        protocol: "http",
        hostname: "maepui-core.s3.amazonaws.com",
      },
    ],
  },
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;
