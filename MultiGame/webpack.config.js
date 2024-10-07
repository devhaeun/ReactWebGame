const path = require('path');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	name: 'webpack-setting',
	mode: 'development',
	devtool: 'eval',
	resolve: {
		extensions: ['.js', '.jsx']
	},
	
	entry: {
		app: './client'
	},
	
	module: {
		rules: [{
			test: /\.jsx?$/,
			loader: 'babel-loader',
			options: {
				presets: [
					['@babel/preset-env', {
						targets: {
							browsers: ['> 5% in KR', 'last 2 chrome versions']
						}
					}], '@babel/preset-react'],
				plugins: ['react-refresh/babel'],
			},
            exclude: path.join(__dirname, 'node_modules'),
		}],
	},
	
    plugins: [
        new ReactRefreshWebpackPlugin(),
    ],

	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name].js',
        publicPath: '/dist',
	},

    devServer: {
        devMiddleware: { publicPath: '/dist' },
        static: { directory: path.resolve(__dirname) },
        hot: true,
        historyApiFallback: true,
    }
}