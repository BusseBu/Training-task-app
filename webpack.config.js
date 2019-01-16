const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const options = {
	template: "./src/index.html",
	filename: "./index.html"
};

const htmlPlugin = new HtmlWebPackPlugin(options);

const miniCssPlugin = new MiniCssExtractPlugin({
	filename: "[name].[hash].css",
	chunkFilename: "[id].[hash].css",
});

module.exports = {
	context: __dirname,
	entry: "./src/index.js",
	output: {
		path: path.resolve("dist"),
		filename: '[name].[hash].js'
	},

	module: {
		rules: [
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: [ /node_modules/, /bin/ ],
				loader: "eslint-loader",

				options: {
					fix: true
				}
			},
			{
				test: /\.(js|jsx|mjs)$/,
				loader: "babel-loader",
				exclude: [ /node_modules/, /bin/ ],
				options: {
					cacheDirectory: true,
					presets: [
						"@babel/preset-env",
						"@babel/preset-react"
					],
					plugins: [
						"@babel/plugin-transform-runtime",
						"@babel/plugin-proposal-class-properties"
					]
				},
			},
			{
				test: /\.(css|scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					{
						loader: "css-loader",
						options: {
							importLoaders: 1
						}
					}
				]
			}
		]
	},

	resolve: {
		alias: {
			'@': path.resolve('.'),
			components: path.resolve('./src/components')
		}
	},
	plugins: [
		miniCssPlugin,
		htmlPlugin
	]
};
