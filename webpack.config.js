const createExpoWebpackConfig = require("@expo/webpack-config");
module.exports = function(env, argv) {
  env.mode = "development";
  return createExpoWebpackConfig(env, argv);
};
