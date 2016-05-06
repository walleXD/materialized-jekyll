const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [ "./_js/app.js", "./_sass/app.scss"],
  output: {
    filename: "public/bundle.js"
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style','!css?sourceMap!sass?sourceMap!')
      },
      // Font Definitions
        { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=public/fonts/[name].[ext]' },
        { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=public/fonts/[name].[ext]' },
        { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=public/fonts/[name].[ext]' },
        { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=public/fonts/[name].[ext]' },
        { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=public/fonts/[name].[ext]' },
        { test: /materialize-css\/dist\/js\/materialize\.js/, loader: 'imports?materializecss' },
    ]
  },
  resolve: {
    extensions: ['', '.js'],
    materialize: 'materialize-css/dist/js/materialize.js'
  },
  plugins: [
    new ExtractTextPlugin( 'public/bundle.css', {
        allChunks: true
    }),
    new WebpackShellPlugin({
      verbose: true,
      onBuildEnd:['jekyll server -w -t ']
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      "root.jQuery": "jquery",
      Hammer: "hammerjs/hammer"
    })
  ],
  watch: true
}
