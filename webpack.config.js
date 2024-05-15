const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

module.exports = {
    entry: require('./webpack.mapping'),
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static/image/*' },
            ],
        }),
        new MiniCssExtractPlugin({ filename: '[name].min.css' }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({ extractComments: false })],
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    output: {
        filename: '[name].min.js',
    },
    mode: isProduction ? 'production' : 'development',
};