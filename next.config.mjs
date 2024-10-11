/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  compiler: {
    // styleds: true,
  },
  images: {
    unoptimized: true,
    domains: ['example-apis.vercel.app', 'api.dicebear.com'],
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Only add the file-loader rule on the client-side
    if (!isServer) {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/i, // Match font files
        type: 'asset/resource', // Use Asset Modules for font files
        generator: {
          filename: 'static/fonts/[name].[hash][ext]',
        },
      });
    }

    return config;
  },
};

export default nextConfig;
