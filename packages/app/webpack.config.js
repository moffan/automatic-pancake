const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const version = require("./package.json").version;
const webpack = require("webpack");

const entry = path.resolve(__dirname, "src", "index.tsx");

module.exports = (
  { mode, target } = { mode: "development", target: "electron-renderer" }
) => ({
  entry: "./src/index.tsx",
  devtool: "none",
  mode,
  target,
  entry,
  output: {
    path: path.resolve(__dirname, "../.lib/app"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "babel-loader",
        options: {
          extends: path.join(__dirname, "/.babelrc"),
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(version),
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      // filename: path.resolve(__dirname, "..", "index.html")
    }),
  ],
});
