var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader:[ 'style-loader', 'css-loader' ]
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './public/index.html'
  })],
  devServer: {
    historyApiFallback: true
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: 'http://localhost:3001'
    })
  }
}