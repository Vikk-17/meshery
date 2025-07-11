/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
const nextConfig = removeImports({
  reactStrictMode: false,
  compiler: {
    relay: require('./relay.config'),
  },
  typescript: {
    // NOTE: This is a temporary setting to ignore TypeScript build errors during the migration process.
    // Please remove this once migration is finished and type errors are resolved.
    ignoreBuildErrors: true,
  },
  exportPathMap: function () {
    return {
      '/404': { page: '/404' },
      '/configuration/filters': { page: '/configuration/filters' },
      '/configuration/catalog': { page: '/configuration/catalog' },
      '/configuration/designs': { page: '/configuration/designs' },
      '/configuration/designs/configurator': { page: '/configuration/designs/configurator' },
      '/extension/[...component]': { page: '/extension/[...component]' },
      '/extensions': { page: '/extensions' },
      '/': { page: '/', query: { __nextDefaultLocale: 'en' } },
      '/management/adapter': { page: '/management/adapter' },
      '/management/environments': { page: '/management/environments' },
      '/management/connections': { page: '/management/connections' },
      '/management/workspaces': { page: '/management/workspaces' },
      '/performance': { page: '/performance' },
      '/performance/profiles': { page: '/performance/profiles' },
      '/settings': { page: '/settings' },
      '/user/preferences': { page: '/user/preferences' },
    };
  },
  //  exportPathMap: function (pathMap) {
  //    console.log(pathMap)
  //    if (process.env.PLAYGROUND === "true") {
  //      return {
  //        '/': { page: '/' },
  //        '/extension/*': { page: "/extension/[component]" }
  //      }
  //    } else {
  //      return pathMap
  //    }
  //  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'remote-component.config.js': __dirname + '/remote-component.config.js',
    };
    (config.output.webassemblyModuleFilename = 'static/[modulehash].wasm'),
      (config.experiments = { asyncWebAssembly: true, layers: true });
    return config;
  },
});

module.exports = nextConfig;
