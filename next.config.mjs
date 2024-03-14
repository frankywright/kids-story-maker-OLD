/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ckngsmtjumbnwksjutdo.supabase.co',
            // port: '',
            // pathname: '/account123/**',
          },
        ],
      },
};

export default nextConfig;
