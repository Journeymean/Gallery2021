const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProduction = true;

module.exports = {
  entry: "./js/gallery.js",
  output: {
    filename: "gallery.js",
    path: path.resolve(__dirname , "dist"),
    library: "Gallery",
    libraryTarget: "umd",
    libraryExport: "default",
  },
  module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  plugins: isProduction
    ? [
        new MiniCssExtractPlugin({
          filename: "gallery.css",
        }),
      ]
    : [],
};
