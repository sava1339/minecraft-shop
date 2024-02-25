const path = require('path')
const TerserWebpackPlugin = require("terser-webpack-plugin")
const HtmlMinimizeWebpackPlugin = require("html-minimizer-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
    entry: path.resolve(__dirname,'index.jsx'),
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:"build.js"
    },
    optimization:{
        minimize:true,
        minimizer:[
            new TerserWebpackPlugin(),
            new HtmlMinimizeWebpackPlugin()
        ]
    },
    resolve:{
        extensions:['.js','.jsx']
    },
    devServer:{
        historyApiFallback:true,
        static:{
            directory:path.join(__dirname,"/")
        },
        port: 5000
    },
    module:{
        rules:[
            {
                test: /\.(?:js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test:/\.(?:svg|png|jpg|webp|json)$/,
                type: 'asset/resource'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader:'css-loader', options:{importLoaders: 1}
                    },
                    'postcss-loader'
                ],
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname,'index.html'),
            favicon: path.resolve(__dirname,'src','img','fav.png')
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css",
            chunkFilename: "styles.css"
        }),
        require('tailwindcss')
    ]
}