const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require('terser-webpack-plugin');
//const regeneratorRuntime =  require("regenerator-runtime");

module.exports = {
    entry: './src/client/js/index.js',
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/index.html",
            filename: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    }
}
