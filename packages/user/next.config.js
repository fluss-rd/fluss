const withPlugins = require("next-compose-plugins");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const withTM = require("next-transpile-modules")(["shared"]);

// TODO: Investigate about using the .env file here instead of using hardcoded elements
module.exports = withPlugins([withTM], {
  env: {
    mapboxToken:
      "pk.eyJ1IjoibWlraGFlbDE3MjkiLCJhIjoiY2ttbGN2Y2M1MTl3YjJ1bjAyZmg0MmU1NCJ9.WiU0fisWQSYwcEs-Ay6ONw",
    apiUrl: "http://ec2-3-91-104-58.compute-1.amazonaws.com:5000",
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

