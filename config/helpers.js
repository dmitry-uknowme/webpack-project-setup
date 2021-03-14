const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const fs = require('fs');

const PROJECT = {
	path: {
		src: path.resolve(__dirname, '../src'),
		build: path.resolve(__dirname, '../build'),
	},
};

function generateHtmlFiles(templateDir) {
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
	return templateFiles.map((item) => {
		const parts = item.split('.');
		const name = parts[0];
		const extension = parts[1];
		return new HtmlWebpackPlugin({
			filename: `${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
			inject: true,
			hash: true,
		});
	});
}

const styleLoader = (cssOptions, preProcessor, isDev = true) => {
	// const loaders = [
	// 	'style-loader',
	// 	{
	// 		loader: 'css-loader',
	// 		options: cssOptions,
	// 	},
	// 	{
	// 		// Options for PostCSS as we reference these options twice
	// 		// Adds vendor prefixing based on your specified browser support in
	// 		// package.json
	// 		// loader: require.resolve('postcss-loader'),
	// 		// options: {
	// 		// 	// Necessary for external CSS imports to work
	// 		// 	// https://github.com/facebook/create-react-app/issues/2677
	// 		// 	ident: 'postcss',
	// 		// 	plugins: () => [
	// 		// 		require('postcss-flexbugs-fixes'),
	// 		// 		require('postcss-preset-env')({
	// 		// 			autoprefixer: {
	// 		// 				flexbox: 'no-2009',
	// 		// 			},
	// 		// 			stage: 3,
	// 		// 		}),
	// 		// 		// Adds PostCSS Normalize as the reset css with default options,
	// 		// 		// so that it honors browserslist config in package.json
	// 		// 		// which in turn let's users customize the target behavior as per their needs.
	// 		// 		// postcssNormalize(),
	// 		// 	],
	// 		// 	sourceMap: isDev,
	// 		// },
	// 	},
	// ];
	// if (preProcessor) {
	// 	loaders.push({
	// 		loader: preProcessor,
	// 		options: {
	// 			sourceMap: true,
	// 		},
	// 	});
	// }
	// return loaders;
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
		},
		{
			loader: 'css-loader',
			options: cssOptions,
		},
		{
			loader: 'postcss-loader',
			options: {
				postcssOptions: {
					ident: 'postcss',
					plugins: () => [
						require('postcss-flexbugs-fixes'),
						require('postcss-preset-env')({
							autoprefixer: {
								flexbox: 'no-2009',
							},
							stage: 3,
						}),
						// postcssNormalize(),
					],
					sourceMap: isDev,
				},
			},
		},
	];

	if (preProcessor) {
		loaders.push({
			loader: preProcessor,
			options: {
				sourceMap: true,
			},
		});
	}
	return loaders;
};

module.exports = {
	PROJECT,
	styleLoader,
	generateHtmlFiles,
};
