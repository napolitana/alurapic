var path = require("path");
const babiliPlugin = require("babili-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
const optmizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let plugins = [];
let SERVICE_URL = JSON.stringify("http://localhost:3000");

plugins.push(
  new HtmlWebpackPlugin({
    hash: true,
    minify: {
      html5: true,
      collapseWhitespace: true,
      removeComments: true,
    },
    filename: "index.html",
    template: __dirname + "/main.html",
  })
);

plugins.push(
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: "vendor.bundle.js",
  })
);

plugins.push(new extractTextPlugin("styles.css"));

plugins.push(
  new webpack.ProvidePlugin({
    $: "jquery/dist/jquery.js",
    jQuery: "jquery/dist/jquery.js",
  })
);

if (process.env.NODE_ENV == "production") {
  SERVICE_URL = JSON.stringify("http://endereco-da-api");
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  plugins.push(new babiliPlugin());
  plugins.push(
    new optmizeCSSAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
      canPrint: true,
    })
  );
}

//Como a variável tem o mesmo nome da propriedade é passada como parâmetro, basta passar o nome da variável
//Substitui todas as ocorrências de "SERVICE_URL" pelo valor da variável SERVICE_URL
plugins.push(new webpack.DefinePlugin({ SERVICE_URL }));

module.exports = {
  entry: {
    app: "./app-src/app.js",
    vendor: ["jquery", "bootstrap", "reflect-metadata"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: extractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader",
        }),
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=application/octet-stream",
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml",
      },
    ],
  },
  plugins,
};
