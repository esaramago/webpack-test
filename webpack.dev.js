/*
    Webpack Desenvolvimento
    Configurações de produção
*/

const common = require("./webpack.common"); // importação das configurações comuns a desenvolvimento e produção
const { merge } = require("webpack-merge"); // junta as configurações comuns às de desenvolvimento

module.exports = merge(common, {
    mode: "development",
    devtool: 'source-map', // create sourcemaps
    watch: true
});