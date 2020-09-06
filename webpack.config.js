const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: path.resolve(__dirname, "src/index.ts"),

  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].bundle.js",
    library: "maelstrom-futurism",
    libraryTarget: "umd",
    globalObject: "this"
  },
  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve("babel-loader")
          },
          {
            loader: require.resolve("awesome-typescript-loader"),
            options: {
              noUnusedLocals: false
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: require.resolve("babel-loader")
          }
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff2?|png|jpg)$/,
        use: [
          {
            loader: require.resolve("url-loader")
          }
        ]
      }
    ]
  },

  plugins: [new CleanWebpackPlugin()],

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
  }
};
