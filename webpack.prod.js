/*
    Webpack Produção
    Configurações de produção
*/

const common = require("./webpack.common"); // importação das configurações comuns a desenvolvimento e produção
const { merge } = require("webpack-merge"); // junta as configurações comuns às de produção

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map", // create sourcemaps
});