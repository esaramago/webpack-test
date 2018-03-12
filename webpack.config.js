
// __Multiple file bundle __________________________________________________________
// https://stackoverflow.com/a/43611910/4163699

const path = require('path'); // get root path (this is a core node js package)

var fs = require('fs');

function getEntries() {
    return fs.readdirSync('./src/js/')
        .filter(
            (file) => file.match(/.*\.js$/)
        )
        .map((file) => {
            return {
                name: file.substring(0, file.length - 3),
                path: './src/js/' + file
            }
        }).reduce((memo, file) => {
            memo[file.name] = file.path
            return memo;
        }, {})
}

module.exports = {

    // ficheiros individuais
    /* entry: {
        main: './src/js/main.js', // o nome da propriedade é utilizado para o nome do ficheiro final
        main2: './src/js/main2.js'
    }, */

    // ficheiros de uma pasta usando a função getEntries, acima. (créditos: https://stackoverflow.com/a/43611910/4163699)
    entry: getEntries,


    output: {
        path: path.resolve(__dirname, 'dist'), // './dist'
        filename: '[name]-bundle.js'
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
    devtool: 'source-map', // create sourcemaps
    watch: true
}


// __SINGLE FILE BUNDLE __________________________________________________________
/* 
const path = require('path'); // get root path (this is a core node js package)

module.exports = {
    entry: './src/js/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'), // './dist'
        filename: 'bundle.js'
    },
    devtool: 'source-map', // any 'source-map'-like devtool is possible
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
} */