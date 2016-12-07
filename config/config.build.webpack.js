const path = require("path");
const FileChanger = require("webpack-file-changer");
const package = require("../package.json");
const Utility = require("./util/Utility");


const paths = {
    app: path.resolve(Utility.projectDir, "src"),
    site: path.resolve(Utility.projectDir, "site"),
    www: path.resolve(Utility.projectDir, "www"),
    static: path.resolve(Utility.projectDir, "static"),
    node_modules: path.resolve(Utility.projectDir, "node_modules"),
};

paths.indexHtml = path.resolve(paths.static, "index.html");

const webpackConfig = {
    entry: paths.site ,
    output: {
        filename: "bundle.js",
        path: paths.www
    },
    context: paths.app,
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        alias: {
        "wasabi-ui": paths.app
        },
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    },
    ts: {
        configFileName: "/config/config.build.ts.json"
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {test: /\.tsx?$/, loader: "ts-loader"}
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    plugins: []
};


const fileChanger = new FileChanger({
    move: [{
        from: paths.static,
        to: paths.www
    }, {
        from: paths.node_modules + "/bootstrap/dist",
        to: paths.www + "/bootstrap"
    }
    ],
    change: [{
        file: paths.indexHtml,
        parameters: {
            "\\$VERSION": package.version,
            "\\$BUILD_TIME": new Date()
        }
    }
    ]
});

webpackConfig.plugins.push(fileChanger);

module.exports = webpackConfig;