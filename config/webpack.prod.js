const common = require('./webpack.common');
const { merge } = require('webpack-merge');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const { styleHandler, filename, generateHtmlFiles } = require('./helpers');

const isDev = false;
const htmlFiles = generateHtmlFiles('../src/html/pages', isDev);

const prodConfig = {
	mode: 'production',
	output: {
		filename: filename('[name]', 'js', isDev),
	},
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
	optimization: {
		splitChunks: { chunks: 'all' },
		minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: filename('[name]', 'css', isDev),
		}),
		new ImageMinimizerPlugin({
			minimizerOptions: {
				plugins: [
					['gifsicle', { interlaced: true }],
					['jpegtran', { progressive: true }],
					['optipng', { optimizationLevel: 5 }],
					[
						'svgo',
						{
							plugins: [
								{
									removeViewBox: false,
								},
							],
						},
					],
				],
			},
		}),
		...htmlFiles,
	],
};

module.exports = merge(common, prodConfig);
