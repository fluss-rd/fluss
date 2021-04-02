const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  env: {
    mapboxToken:
      "pk.eyJ1IjoibWlraGFlbDE3MjkiLCJhIjoiY2ttbGN2Y2M1MTl3YjJ1bjAyZmg0MmU1NCJ9.WiU0fisWQSYwcEs-Ay6ONw",
  },
  webpack(config, options) {
    const { dev, isServer } = options;

    // Do not run type checking twice:
    if (dev && isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return config;
  },
};

