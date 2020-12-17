const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const extractSass = new MiniCssExtractPlugin({
  filename: 'app.css'
})


function sassRules () {
  return [
    {
      test: /\.(sass|scss)$/,
      use: [{loader: MiniCssExtractPlugin.loader}, {loader: 'css-loader'}, {loader: 'sass-loader'} ]
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

 const path = require('path');

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
