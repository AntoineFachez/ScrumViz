/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: 'out',
  // public: 'out/static',

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

  // webpack: (config, { isServer }) => {
  //   // Only add the file-loader rule on the client-side
  //   if (!isServer) {
  //     config.module.rules.push({
  //       test: /\.(woff|woff2|eot|ttf|otf)$/i, // Match font files
  //       type: 'asset/resource', // Use Asset Modules for font files
  //       generator: {
  //         filename: 'static/fonts/[name].[hash][ext]',
  //       },
  //       use: {
  //         loader: 'next-font-loader',
  //         options: {
  //           // Emit the font files to the public directory
  //           publish: 'out',
  //         },
  //       },
  //     });
  //   }

  //   return config;
  // },
};

export default nextConfig;
