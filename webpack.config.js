const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');

const extractSass = new MiniCssExtractPlugin({
  filename: 'app.css'
})


function sassRules () {
  return [
    {
      test: /\.(css|sass|scss)$/,
      use: [ MiniCssExtractPlugin.loader, {loader: 'css-loader', options: { importLoaders: 1 }}, {loader: 'sass-loader'}, 'postcss-loader']
    }
  ]
}

function scriptRules () {
  return [
    {
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel-loader',
      options: { presets: ['@babel/preset-env', '@babel/preset-react'] }
    }
  ]
}


module.exports = {
  entry: [
    './resources/assets/sass/app.scss',
    './resources/assets/scripts/app.js'
  ],
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: sassRules().concat(scriptRules()),
  },
  plugins: [
    extractSass
  ]
}
