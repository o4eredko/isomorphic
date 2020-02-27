const path = require("path");
const { override, fixBabelImports, addWebpackAlias } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  }),
  // add an alias for "our" imports
  addWebpackAlias({
    "src": path.resolve(__dirname, "src"),
  })
);
