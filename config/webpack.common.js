const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { PROJECT } = require('./helpers');

module.exports = {
	experiments: {
		asset: true,
	},
	mode: 'development',
	entry: { index: PROJECT.path.src + '/index.js' },
	output: {
		path: PROJECT.path.build,
		assetModuleFilename: 'assets/[hash][ext][query]',
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				include: path.resolve(__dirname, '../src/html/includes'),
				// use: [{ loader: 'raw-loader', options: { esModule: false } }],
				use: [{ loader: 'html-loader', options: { esModule: false } }],
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
	plugins: [new CleanWebpackPlugin()],
	resolve: {
		extensions: ['.js'],
	},
};
