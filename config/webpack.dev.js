const { HotModuleReplacementPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { styleHandler, generateHtmlFiles } = require('./helpers');

const isDev = true;

const htmlFiles = generateHtmlFiles('../src/html/pages', isDev);

const devConfig = {
	mode: 'development',
	devtool: 'eval',
	devServer: {
		contentBase: path.resolve(__dirname, '../build'),
		port: 3000,
		open: true,
	},

	target: 'web',
	devtool: 'eval',
	module: {
		rules: [
			{
				test: /\.global\.s[ac]ss$/,
				use: styleHandler(isDev, {}, 'sass-loader'),
			},

			{
				test: /\.s[ac]ss$/,
				exclude: /\.global\.s[ac]ss$/,

				use: styleHandler(
					isDev,
					{
						modules: true,
						localIdentName: '[name]__[local]',
						sourceMap: true,
					},
					'sass-loader'
				),
			},

			{
				test: /\.global\.css$/,
				use: styleHandler(isDev),
			},

			{
				test: /\.css$/,
				exclude: /\.global\.css$/,
				use: styleHandler(isDev, {
					modules: true,
					localIdentName: '[name]__[local]',
					sourceMap: true,
				}),
			},
		],
	},

	plugins: [
		// require('postcss-preset-env')({
		// 	browsers: 'last 2 versions',
		// }),
		new MiniCssExtractPlugin(),
		new HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin(),
		...htmlFiles,
	],
};

module.exports = merge(common, devConfig);
