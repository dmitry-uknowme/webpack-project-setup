const { HotModuleReplacementPlugin } = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const { styleLoader } = require('./helpers');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isDev = true;

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
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},

			{
				test: /\.s[ac]ss$/,
				exclude: /\.global\.s[ac]ss$/,

				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]',
							sourceMap: true,
						},
					},
					'sass-loader',
				],
			},

			{
				test: /\.global\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},

			{
				test: /\.css$/,
				exclude: /\.global\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[name]__[local]',
							sourceMap: true,
						},
					},
				],
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
	],
};

module.exports = merge(common, devConfig);
