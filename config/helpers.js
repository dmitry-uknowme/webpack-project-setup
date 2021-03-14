const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const fs = require('fs');

const PROJECT = {
	path: {
		src: path.resolve(__dirname, '../src'),
		build: path.resolve(__dirname, '../build'),
	},
};

function generateHtmlFiles(templateDir, isDev) {
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
	return templateFiles.map((item) => {
		const parts = item.split('.');
		const name = parts[0];
		const extension = parts[1];
		return new HtmlPlugin({
			filename: `${name}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
			minify: {
				collapseWhitespace: !isDev,
			},
			inject: true,
			hash: true,
		});
	});
}

const styleHandler = (isDev, cssOptions, preProcessor) => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
		},
		{
			loader: 'css-loader',
			options: cssOptions,
		},
	];

	if (preProcessor) {
		loaders.push({
			loader: preProcessor,
			options: {
				sourceMap: isDev,
			},
		});
	}
	return loaders;
};

module.exports = {
	PROJECT,
	styleHandler,
	generateHtmlFiles,
};
