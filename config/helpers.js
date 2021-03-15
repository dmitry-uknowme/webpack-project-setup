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
			// filename: filename(name, 'html', isDev),  //dont work
			filename: `${name}${!isDev ? '.[contenthash]' : ''}.html`,
			template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
			minify: {
				collapseWhitespace: !isDev,
			},
			inject: true,
			hash: true,
		});
	});
}

function filename(name, ext, isDev) {
	return ` ${name}${!isDev ? '.[contenthash]' : ''}.${ext}`;
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
	filename,
	styleHandler,
	generateHtmlFiles,
};
