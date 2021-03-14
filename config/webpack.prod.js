const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const { styleHandler, generateHtmlFiles } = require('./helpers');

const isDev = false;
const htmlFiles = generateHtmlFiles('../src/html/pages', isDev);

const prodConfig = {
	mode: 'production',
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
		minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()],
	},

	plugins: [...htmlFiles],
};

module.exports = merge(common, prodConfig);
