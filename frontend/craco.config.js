const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@images": path.resolve(__dirname, "../images"),
      "@frontend": path.resolve(__dirname, "./src"),
      "@backend": path.resolve(__dirname, "../backend"),
      "@": path.resolve(__dirname, "../"),
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
