/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'bitcoinmagazine.com',
      'cdn-icons-png.flaticon.com',
      'www.newsbtc.com',
      'cryptopotato.com',
      'pbs.twimg.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'  // Wildcard to allow all HTTPS hostnames
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'http',
        hostname: 'activistpost.com'
      },
      {
        protocol: 'http',
        hostname: 'ipfs.io'
      },
      {
        protocol: 'http',
        hostname: '**'
      },
      {
        protocol: 'https',
        hostname: 'google.com'
      }
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });
    return config;
  },
}

module.exports = nextConfig;