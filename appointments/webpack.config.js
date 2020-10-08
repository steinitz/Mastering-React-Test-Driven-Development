const path = require("path");
const webpack = require("webpack");

module.exports = {
 mode: "development",
 devtool: "source-map",
 module: {
   rules: [{
     test: /\.(js|jsx)$/,
     exclude: /node_modules/,
     loader: 'babel-loader'}]}
};

