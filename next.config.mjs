import { DefaultChain } from './.cache/chains.mjs'
import { withSentryConfig } from '@sentry/nextjs'

const sentryWebpackPluginOptions = {
  org: process.env.SENTRY_ORG,
  project: 'explorer',
  silent: true,
}
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  sentry: {
    hideSourceMaps: false,
  },
  async rewrites() {
    return [
      {
        source: '/:chain/asset/:assetId/buy',
        destination: '/:chain/asset/:assetId',
      },
      {
        source: '/:chain/collection/:contract/sweep',
        destination: '/:chain/collection/:contract',
      },
      {
        source: '/:chain/collection/:contract/mint',
        destination: '/:chain/collection/:contract',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: `/${DefaultChain.routePrefix}`,
        permanent: false,
      },
      {
        source: '/collection/:chain/:collection',
        destination: '/:chain/collection/:collection',
        permanent: true,
      },
      {
        source: '/collection/:chain/:collection/:tokenId',
        destination: '/:chain/asset/:collection%3A:tokenId',
        permanent: true,
      },
      {
        source: '/collection-rankings',
        destination: `/${DefaultChain.routePrefix}/collection-rankings`,
        permanent: true,
      },

      {
        source: '/:chain/collection-rankings',
        destination: `/:chain/collections/trending`,
        permanent: false,
      },
    ]
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }
}

export default withSentryConfig(nextConfig, sentryWebpackPluginOptions)
