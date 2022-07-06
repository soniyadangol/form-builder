const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "dist/assets"),
        filename: "bundle.js",
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.js$|jsx/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                          name: '[name].[ext]',
                          outputPath: 'images/',
                          publicPath: 'images/'
                        }
                    }
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: './src/index.html',
            chunks: ['index'],
            inject: 'body',
            filename: 'index.html'
        }),

        new HtmlWebpackPlugin ({
            template: './src/dashboard.html',
            chunks: ['dashboard'],
            inject: 'body',
            filename: 'dashboard.html'
        }),

        new MiniCssExtractPlugin ({
            filename: '[name].[hash:8].css'
        }),

        new CleanWebpackPlugin()
    ]
};
