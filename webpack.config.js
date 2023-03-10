const MiniCssExtractPlugin = require ("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",

    module: {
        rules: [
            {
                test: /\.s?css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
            test:/\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
            },
            },
        ],
    },

    plugins: [new MiniCssExtractPlugin(), new HtmlWebpackPlugin({
        template: "./src/index.html",
    })],

    devtool: false,
    devServer: {
        hot: true,
    }

};