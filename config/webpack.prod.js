const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prodConfig = {
	mode: 'production',
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.css$/,
	// 			use: [
	// 				MiniCssExtractPlugin.loader,
	// 				{
	// 					loader: 'css-loader',
	// 					options: {
	// 						modules: true,
	// 						localIdentName: '[path]_[name]_[local]',
	// 					},
	// 				},
	// 			],
	// 		},
	// 	],
	// },
	optimization: { splitChunks: { chunks: 'all' } },

	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[name].[contenthash].css',
		}),
	],
};

module.exports = merge(common, prodConfig);
