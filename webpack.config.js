var path = require('path');
var glob = require("glob");

var sourcePath = "./src/";
var outPath = "./dist/";

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    context: __dirname,
    entry: () =>
    {
        
        var files = glob.sync(sourcePath + "/**/_*.ts");
        
        var entries = files.reduce((o, v) => { 
            var item = {};
            item[v] = v;
            return item;
          }, {});
          console.log(entries);
        return entries;
    },
    output: {
        filename: (pathData) => {
            var filename = '' + pathData.chunk.name;
            filename = filename.slice(sourcePath.length);
            filename = filename.slice(0, filename.lastIndexOf('.ts'));
            filename = filename + '.js';
            console.log(filename);
            return filename;
        },
      path: path.resolve(__dirname, "dist")
    },
    resolve: {
      // Add `.ts` and `.tsx` as a resolvable extension.
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    }
  }