const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  // line to active development mode
  mode: "development",
  watch: true,
  resolve: {
    extensions: [".js"],

    //Alias for long routes
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      //add the preprocesors
      {
        test: /\.css|.styl$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },

      //hashing images
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        //regular expresion for fonts
        test: /\.(woff|woff2)$/,
        // set the use loader
        use: {
          loader: "url-loader",
          //setting tje uptions
          options: {
            limit: 10000,
            // data type using
            MimeType: "aplication/font-woff",
            name: "[name].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "./assets/fonts/",
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        //copy images directory from src to dist with copy plugin webpack
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),

    //plugin for enviroment variables
    new DotEnv(),
  ],
};
