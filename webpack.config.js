const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "./js/app.js",
        publicPath: "/",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.jsx?/,
                loader: "eslint-loader",
                exclude: /node_modules/,
                enforce: "pre",
                options: {
                    emitWarning: true
                }
            },
            {
                test: /\.jsx?/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["env", "react"],
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }]
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=/fonts/[name].[ext]&publicPath=http://localhost:8080/'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("css/app.css"),
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
};
