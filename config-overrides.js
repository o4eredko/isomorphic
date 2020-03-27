const path = require("path");
const {
  override,
  fixBabelImports,
  addWebpackAlias,
  overrideDevServer
} = require("customize-cra");


// module.exports = {
//   webpack: override(
//     fixBabelImports("import", {
//       libraryName: "antd",
//       libraryDirectory: "es",
//       style: "css",
//     }),
//     addWebpackAlias({
//       "src": path.resolve(__dirname, "src"),
//     }),
//     overrideDevServer(() => config => {
//       return {
//         ...config,
//         https: {
//           key: fs.readFileSync(process.env.REACT_HTTPS_KEY, "utf8"),
//           cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, "utf8"),
//         }
//       }
//     })
//   ),
// devServer: function (configFunction) {
//   Return the replacement function for create-react-app to use to generate the Webpack
//   Development Server config. "configFunction" is the function that would normally have
//   been used to generate the Webpack Development server config - you can use it to create
//   a starting configuration to then modify instead of having to create a config from scratch.
// return function (proxy, allowedHost) {
//   Create the default config by calling configFunction with the proxy/allowedHost parameters
// const config = configFunction(proxy, allowedHost);
//
// Change the https certificate options to match your certificate, using the .env file to
// set the file paths & passphrase.
// const fs = require("fs");
// config.https = {
//   key: fs.readFileSync(process.env.REACT_HTTPS_KEY, "utf8"),
//   cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, "utf8"),
// };
//
// Return your customised Webpack Development Server config.
// return config;
// }
// }
// }

const devServerConfig = () => config => {
  const fs = require("fs");
  return {
    ...config,
    https: {
      key: fs.readFileSync(process.env.REACT_HTTPS_KEY, "utf8"),
      cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, "utf8"),
    }
  }
};

module.exports = {
  webpack: override(
    fixBabelImports("import", {
      libraryName: "antd", libraryDirectory: "es", style: "css"
    }),
    addWebpackAlias({ "src": path.resolve(__dirname, "src") })
  ),
};
