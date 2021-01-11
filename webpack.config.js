var path = require('path');
var glob = require("glob");
const webpack = require('webpack');

var rootPath = "./wwwroot/"
var sourcePath = rootPath + "js/src/";
var outPath = rootPath + "js/dist/";

module.exports = {
    mode: "development",
    devtool: false,
    entry: () => {
        var files = glob.sync(sourcePath + "**/_*.ts");
        var entries = files.reduce((o, v) => {
            var key = v.slice(sourcePath.length);
            o[key] = v;
            return o;
        }, {});
        console.log("Entries:");
        console.log(entries);
        return entries;
    },
    output: {
        filename: (pathData) => {
            var filename = '' + pathData.chunk.name;
            filename = filename.slice(0, filename.lastIndexOf('.ts'));
            filename = filename + '.js';
            return filename;
        },
        path: path.resolve(__dirname, outPath)
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
        }
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            moduleFilenameTemplate: info => {
                if (info.resourcePath.startsWith(rootPath)) {
                    var path = info.resourcePath.slice(rootPath.length);
                    return path;
                }
                return info.resourcePath;
            },
            sourceRoot: '/',
        })
    ]

}