const path = require('path');
const glob = require('glob');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')


const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const env = process.env.NODE_ENV || 'development';
const debug = env !== 'production';

console.log(debug)
var getEntry = function (pathName) {
  var entry = {};
  console.log(pathName.split('/public')[1])
  fs.readdirSync(pathName,'utf-8').forEach(function (name) {
	    const filename = path.basename(name,'.js')
	    const files = [path.join(pathName,filename)]
	    if(debug){
	      files.push(hotMiddlewareScript)
	    }
	    entry[pathName.split('/public')[1]+filename] = files
  	})
	console.log(entry)
  	return entry;
}


const config = {
    devtool: debug ? 'eval-source-map' : 'source-map',
    entry: getEntry(path.join(__dirname,'../public/javascripts/')),
    output: {
        path: path.join(__dirname, '../public-prod'),
        filename: '[name]_[hash:5].js'
        // chunkFilename: "./[name]/[id].chunk.js",
        // publicPath: '/'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env)
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'javascripts/[name].bundle.js',
            minChunks: 2
            // chunks: ["index", "about"]
        }),
        new ExtractTextPlugin('/stylesheets/[hash:8].[name].css')
    ],
    module: {
        // preLoaders: [
        //   { test: /\.js$/, loader: "eslint-loader", exclude: /node_modules/ }
        // ],
        loaders: [{
            test: /\.js$|\.jsx$/,
            loader: 'babel',
            // include: path.join(__dirname, '../public'),
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.(jpe?g|png|gif)$/i,
            loaders: [
                'url?limit=10000&name=images/[name].[ext]',
                'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
            ]
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
        }]
    },
    // eslint: {
    //   configFile: './.eslintrc.json'
    // },
	resolve: {
		extensions: ['', '.js', '.less', '.css']
	}
};
if (!debug) {
    config.plugins.push(new UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }))
}
console.log(config)
module.exports = config