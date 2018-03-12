const path = require('path'); // get root path (this is a core node js package)

//const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    entry: './src/js/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // "./dist"
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/, // get js files
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015']
                        }
                    }
                ]
            }/* ,
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "sass-loader"
                ]
            } */
        ]
    },
    /* plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "main.css",
            chunkFilename: "main.scss"
        })
    ], */
    watch: true
}