/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'pvkxfzjvedrvbffgezvi.supabase.co',
            // port: '',
            // pathname: '/account123/**',
          },
        ],
      },
};

export default nextConfig;
