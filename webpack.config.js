const path = require ("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

module.exports = {
    entry: {
       index: path.resolve(__dirname, "./src/index.js")
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name].bundle.js",
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./src/template.html"),
        inject: "body",
        favicon: "./src/img/favicon.ico"
        })
    ],
    module: {
        rules:[
            {
            test: /\.(jpe?g|png|ico|webp)$/i,
            type: "asset/resource"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                }
                }
            }
        ]
    },
    devServer: {
        static:{
            directory: path.resolve(__dirname,"./build")
        },
        devtool:'source-map',
        port:3000,
        open:true,
        hot: true,
        compress:true,
        historyApiFallback:true,
     },
    }

