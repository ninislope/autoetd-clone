// @ts-check

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

/** @type {import("webpack").Configuration & {devServer: any}} */
const config = {
    context: __dirname,
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
            "react-dom": "@hot-loader/react-dom",
        },
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: true,
        }),
    ],
    devtool: "eval-source-map",
    devServer: {
        hot: true,
    },
};

module.exports = config;
