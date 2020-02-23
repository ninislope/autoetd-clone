// @ts-check

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const mode = process.env.NODE_ENV === "production" ? "production" : "development";

/** @type {import("webpack").Configuration & {devServer: any}} */
const config = {
    context: __dirname,
    mode,
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.tsx?/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
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
    devtool: mode === "development" ? "eval-source-map" : "source-map",
    devServer: {
        hot: true,
    },
};

module.exports = config;
