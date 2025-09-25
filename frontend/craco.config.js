const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@backend": path.resolve(__dirname, "../backend"),
      "@images": path.resolve(__dirname, "./public/images"), // this includes images from the public directory
    },
    configure: (webpackConfig) => {
      // Allow importing files from outside src directory
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (plugin) => plugin.constructor.name !== "ModuleScopePlugin"
      );
      return webpackConfig;
    },
  },
};
