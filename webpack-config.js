var webpack  			= require('webpack');
var path  				= require('path');
var config 				= require('./config');

module.exports = function(env) {

	var webpackConfig = {
		entry: path.resolve(__dirname, config.webpack.entry),
		output: {
	    	path: path.resolve(__dirname, config.dest.js),
	    	filename: config.baseNames.js + '.js',
	    	publicPath: path.resolve(__dirname, config.dest.js)
		},
		plugins: [],
		resolve: {
			root: config.dest.js,
			extensions: config.webpack.resolveExtensions
		},
		module: {
			preLoaders: [
				// Javascript
				{ test: /\.js$/, loader: 'eslint', exclude: /node_modules/ }
			],
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['es2015']
					}
				}
			]
		}
	};

	if(env === 'development') {
		webpackConfig.devtool = 'source-map';
		webpack.debug = true;
	}

	if(env === 'production') {
		webpackConfig.plugins.push(
			new webpack.optimize.UglifyJsPlugin(),
			new webpack.NoErrorsPlugin()
		);
	}

	return webpackConfig;
}