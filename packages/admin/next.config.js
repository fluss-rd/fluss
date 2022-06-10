const withPlugins = require("next-compose-plugins");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const withTM = require("next-transpile-modules")(["shared"]);

module.exports = withPlugins([withTM], {
  env: {
    apiUrl: process.env.API_URL,
    apiToken: process.env.API_TOKEN,
    mapboxToken:process.env.MAPBOX_TOKEN,
  },
  webpack(config, options) {
    const { dev, isServer } = options;

    // Do not run type checking twice:
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return config;
  },
});
