var webpack = require('webpack')
var path = require('path')

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        filename: 'build/bundle.js',
        sourceMapFilename: 'build/bundle.map'
    },
    devtool: '#sourcemap',
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
}
