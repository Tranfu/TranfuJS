
const webpack = require('webpack');

module.exports = {

  // MPA
  entry: {
    app: './app/entry/app.js',
    // entry2: './app/entry/entry2.js',
    vendor: ['jquery'],
  },

  // SPA
  // entry: {
  //   entry: './app/entry.js',
  //   vendor: ['jquery'],
  // },

  output: {
    path: __dirname + '/dist/images',
    publicPath: './images/',
    filename: '../js/[name].chunk.js'
  },

  module: {
    // http://webpack.github.io/docs/using-loaders.html
    loaders: [
      // https://github.com/babel/babel-loader
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015'],
          plugins: ['transform-es3-property-literals', 'transform-es3-member-expression-literals']
        }
      },
      // https://github.com/webpack/html-loader
      {
        test: /\.html$/,
        loader: 'html'
      },
      // https://github.com/pcardune/handlebars-loader
      {
        test: /\.handlebars$/,
        loader: 'handlebars-loader',
        query: {
          inlineRequires: '\/images\/',
          helperDirs: [
            __dirname + '/app/pages/hdbs/helpers',
          ],
          partialDirs: [
            __dirname + '/app/pages/hdbs/partials',
          ],
        }
      },
      // https://github.com/jtangelder/sass-loader
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=1024'
      },
    ]
  },

  plugins: [

    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: true,
    //   }
    // }),

    // MPA only
    // https://github.com/webpack/extract-text-webpack-plugin/issues/58
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: '../js/[name].chunk.js',
      // chunks: ['app', 'entry2']
      chunks: ['app',]
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '../js/[name].chunk.js'
    }),
  ]
};
