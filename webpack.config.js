const Path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => ({
    entry: ['./src/main/front/index.jsx'],
    output: {
        path: Path.resolve('./src/main/resources/static/'),
        publicPath: '/',
        filename: argv.mode === 'production' ? 'js/bundle.[contenthash].js' : 'js/bundle.js',
        crossOriginLoading: 'anonymous'
    },
    resolve: {
        modules: [
            Path.resolve('./'),
            Path.resolve('./node_modules'),
            Path.resolve('./src/main/front')
        ]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    argv.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(woff2?|eot|ttf)$/,
                type: 'asset/resource',
                generator: {
                    outputPath: 'css/font/',
                    publicPath: argv.mode === 'production' ? 'font/' : 'css/font/',
                    filename: '[name][ext]'
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true }
                        }
                    ]
                }
            })
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: argv.mode === 'production' ? 'css/bundle.[contenthash].css' : 'css/bundle.css'
        })
    ]
});
