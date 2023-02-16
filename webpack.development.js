const config = require('./webpack.config.js');
const { merge } = require('webpack-merge');
const path = require('path');

module.exports = merge(
	config, { 
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, './dist')
		},
		compress: true,
		port: 8080
		}
	}
)
