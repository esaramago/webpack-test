const path = require('path'); // get root path (this is a core node js package)

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
            }
        ]
    },
    watch: true
}