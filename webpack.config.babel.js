import path from 'path'
import webpack from 'webpack'

import { WDS_PORT, isProd } from './src/config'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: './index.html',
	filename: 'index.html',
	inject: 'body',
})

const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: '[name].bundle.css',
  allChunks: true,
})

const devStyles = {
	test: /\.(sass|scss)$/,
	use: [
		'style-loader',
		'css-loader',
		'postcss-loader',
		'sass-loader'
	]
}

const prodStyles = {
	test: /\.(sass|scss)$/,
	use: ExtractTextPlugin.extract({
		fallback: 'style-loader',
		use: ['css-loader', 'postcss-loader', 'sass-loader']
	})
}

export default {
	context: path.resolve(__dirname, 'src'),
  entry: [
    './main',
		'./styles/main.scss',
  ],
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
	devtool: isProd ? false : 'source-map',
	devServer: {
		port: WDS_PORT,
		hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
		rules: [
      { test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /node_modules/ },
			isProd ? prodStyles : devStyles,
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
		HtmlWebpackPluginConfig,
		ExtractTextPluginConfig,
  ],
}
