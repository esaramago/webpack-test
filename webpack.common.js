/* 
    Webpack Common
    Configurações comuns a desenvolvimento e produção
*/

const path = require("path"); // função nativa do node js, para obter a pasta raíz do projeto
const glob = require("glob"); // package para obter vários ficheiros
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");

function getEntries() {

    const filesPath = glob.sync("./Scripts/**/*.webpack.js"); // retorna um array de ficheiros terminados em ".webpack.js", dentro da pasta Scripts
    
    const files = filesPath.map(path => {
        const splittedByFolder = path.split("/"); // dividir por pasta - [ '.', 'Scripts', 'Module1', 'Page1', 'Module1_Page1.webpack.js' ]
        const file = splittedByFolder[splittedByFolder.length - 1]; // obter o nome do ficheiro - 'Module1_Page1.webpack.js'
        const fileName = file.replace(".webpack.js", ""); // remover .webpack.js - 'Module1_Page1'

        return {
            fileName,
            path
        };
    });

    // construir objeto com o formato da entry do webpack
    const entries = {};
    files.forEach(file => {
        entries[file.fileName] = file.path
    })

    //console.log(entries);

    return entries;
    
}

module.exports = {

    // cria um array com os ficheiros necessários
    entry: getEntries,
    /* entry: {
        main: "./src/js/main.js",
        main2: "./src/js/main2.js",
        main3: "./src/js/main3.js",
        //vendor: "./src/js/vendor.js"
    }, */

    // ficheiros compilados
    output: {
        path: path.resolve(__dirname, "dist"), // pasta onde são colocados os ficheiros compilados
        filename: "[name].min.js" // nome dos ficheiros js compilados
    },

    plugins: [
        new CleanWebpackPlugin(), // apaga do conteúdo da pasta output a cada compilação
        new VueLoaderPlugin(), // compila ficheiros .vue
        /* new HtmlWebpackPlugin({
            inject: "body",
            filename: "../Views/Module1/Page1/Index.html",
            template: "./Views/Module1/Page1/_Template.html"
        }) */
    ],

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader' // importa ficheiros .vue
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },

    optimization: {

        // Create a vendor file 
        splitChunks: {
            cacheGroups: {

                // cria um chunk que apenas inclui o Vue e o React. Os restantes imports são incluidos nos respetivos ficheiros
                vendor: {
                    test: /[\\/]node_modules[\\/](vue|react)[\\/]/, // filtra node_modules/vue e node_modules/react
                    name: "vendor", // nome do ficheiro gerado
                    chunks: "all",
                },
                
                /* // cria um chunk com todos os imports do node_modules
                vendor: {
                    test: /[\\/]node_modules[\\/]/, // filtra node_modules
                    name: "vendor", // nome do ficheiro gerado
                    chunks: "all",
                }, */

                /* // cria chunks inteligentes
                vendor: {
                    test: /[\\/]node_modules[\\/]/, // filtra node_modules
                    //name: "vendor", // nome do ficheiro gerado
                    chunks: "all",
                }, */
            }
        }
    },

    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    }
}