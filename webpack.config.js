const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tsCheckerPlugin = require("fork-ts-checker-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");
const srcPath = path.resolve(__dirname, "src");

const isProd = process.env.NODE_ENV === "production";

const getSettingsForStyles = (withModules = false) => {
  return [
    !isProd ? MiniCssExtractPlugin.loader : "style-loader",
    !withModules ? "css-loader" : {
      loader: "css-loader",
      options: {
        modules: {
          localIdentName: !isProd ? "[path][name]__[local]" : "[hash:base64]"
        }
      }
    },
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["autoprefixer"]
        }
      }
    },
    "sass-loader"]
}

module.exports = {
  entry: path.join(srcPath, "index.tsx"),
  output: {
    path: buildPath,
    filename: "bundle.js"
  },
  target: !isProd ? "web" : "browserslist",
  devtool: isProd ? "hidden-source-map" : "eval-source-map",
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcPath, "index.html")
    }),
    !isProd && new ReactRefreshWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css"
    }),
    new tsCheckerPlugin(),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.module\.s?css$/,
        use: getSettingsForStyles(true)
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.s?css$/,
        use: getSettingsForStyles()
      },
      {
        test: /\.[tj]sx?$/,
        use: "babel-loader"
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    alias: {
      ["@components"]: path.join(srcPath, "components"),
      ["@config"]: path.join(srcPath, "config"),
      ["@styles"]: path.join(srcPath, "styles"),
      ["@utils"]: path.join(srcPath, "utils"),
      ["@pages"]: path.join(srcPath, "pages"),
      ["@assets"]: path.join(srcPath, "assets"),
      ["@hooks"]: path.join(srcPath, "hooks"),
      ["@store"]: path.join(srcPath, "store")
    }
  },
  devServer: {
    host: "localhost",
    port: 9000,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api/**': {
        target: 'https://api.coingecko.com',
        secure: false,
        changeOrigin: true,
      },
    },
  }
}