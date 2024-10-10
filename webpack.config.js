const path = require('path')

module.exports = {
    entry: './src/main.ts',
    context: __dirname,
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'core'),
        publicPath: '/core/'
    },
    module: {
        rules: [{
            test: /\.ts$/,
            exclude: /node_modules/,
            use: {
                loader: 'ts-loader'
            }
        }]
    },
    resolve: {
        extensions: [".ts"]
    }
}
