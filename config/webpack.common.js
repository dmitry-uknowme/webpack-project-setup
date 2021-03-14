const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { PROJECT, generateHtmlFiles } = require('./helpers');

const htmlFiles = generateHtmlFiles('../src/html/pages');

module.exports = {
	experiments: {
		asset: true,
	},
	mode: 'development',
	entry: PROJECT.path.src + '/index.js',
	output: {
		filename: '[name][contenthash].js',
		path: PROJECT.path.build,
		assetModuleFilename: 'assets/[hash][ext][query]',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				include: path.resolve(__dirname, '../src/html/includes'),
				use: [{ loader: 'raw-loader', options: { esModule: false } }],
			},
			{
				test: /.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
				type: 'asset/inline',
			},
		],
	},
	plugins: [new CleanWebpackPlugin(), ...htmlFiles],
	resolve: {
		extensions: ['.js'],
	},
};
