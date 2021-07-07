const withPlugins = require("next-compose-plugins");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const withTM = require("next-transpile-modules")(["shared"]);

module.exports = withPlugins([withTM], {
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

    // Add ts-loader config.
    //config.module.rules.push({
      //test: /\.(ts)x?$/, // Just `tsx?` file only
      //use: [
        //// options.defaultLoaders.babel, I don't think it's necessary to have this loader too
        //{
          //loader: "ts-loader",
          //options: {
            //transpileOnly: true,
            //experimentalWatchApi: true,
            //onlyCompileBundledFiles: true,
          //},
        //},
      //],
    //});

    return config;
  },
});

