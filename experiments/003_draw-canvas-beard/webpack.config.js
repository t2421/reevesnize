module.exports = {
    entry: {
        "index":__dirname+"/src/app.js"
    },
    output: {
        path: __dirname+"/dist",
        filename: "[name].js"
    },
    /* ソースマップを出力させる場合は以下を追加 */
    devtool: "inline-source-map",
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules|web_modules/, loader: "babel-loader"}
        ]
    },
    eslint:{
        configFile:__dirname+'/.eslintrc'
    },
    devServer: {
       contentBase: './'
    }
};