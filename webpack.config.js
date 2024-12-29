const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');


// const mode = process.env.NODE_ENV === "production" ? "production" : "development";

module.exports = {
    mode: "production",
    entry: {
        app: "./src/scripts/index.js",
        contact: "./src/scripts/contact.js"
    },
    output: {
        filename: "./js/[name].[fullhash].bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.hbs$/,
                use: [{
                    loader: "handlebars-loader",
                    options: {
                        inlineRequires: "\/images\/",
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    // without additional settings, this will reference to the .babelrc file
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            // {
            //     test: /\.(png|jpe?g|gif)$/i,
            //     use: [
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 name: "./img/[name].[ext]",
            //                 path: path.resolve(__dirname, "dist")
            //             }
            //         }
            //     ]
            // }
            // {
			// 	test: /\.(png|jpe?g|gif)$/i,
			// 	loader: "file-loader",
			// 	options: {
			// 		name: "./img/[name].[ext]",
            //         path: "dist/",
            //         // publicPath: "/img",
			// 		limit: 8192
			// 	}
            // },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "./img/[name].[ext]",
                        path: "dist/",
                        // publicPath: "/img",
                        limit: 8192,
                        esModule: false
                    }
                }]
            }
        ]
    },
    plugins: [ 
        new MiniCssExtractPlugin({
            filename: "./stylesheet/[name].[fullhash].css",
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.hbs",
            title: "Home Page for Webpack 5",
            inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
            hash: true,
            chunks: ["app"]
        }),
        new HtmlWebpackPlugin({
            filename: "contact.html",
            template: "./src/contact.hbs",
            title: "Contact Page for Webpack 5",
            inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true
			},
            hash: true,
            chunks: ["contact"]
        })
    ],
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        compress: true,
        open: true,
        hot: true
    },
    performance: {
        hints: false
    }
}