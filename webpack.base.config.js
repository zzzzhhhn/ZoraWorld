const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.ts',
        vendors: './src/vendors'
    },
    output: {
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: [{
                test: /.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            less: ExtractTextPlugin.extract({
                                use: ['css-loader?minimize', 'autoprefixer-loader', 'less-loader'],
                                fallback: 'vue-style-loader'
                            }),
                            css: ExtractTextPlugin.extract({
                                use: ['css-loader', 'autoprefixer-loader', 'less-loader'],
                                fallback: 'vue-style-loader'
                            })
                        },
                        transformToRequire: {
                            "audio": "src"
                        }
                    }
                },
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    },
                ]
            },
            {
                test: /iview\/.*?js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize', 'autoprefixer-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.less/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader?minimize','autoprefixer-loader', 'less-loader'],
                    fallback: 'style-loader'
                })
            },

            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name () {
                            return 'imgs/[name].[ext]';
                        }
                    }
                }]
            },
            {
                test: /\.(html|tpl)$/,
                loader: 'html-loader'
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader?$!expose-loader?jQuery'
            },
            // {
            //     test: /\.ts$/,
            //     exclude: /node_modules/,
            //     enforce: 'pre',
            //     loader: 'tslint-loader'
            // },
            {
                test: /\.(ts|tsx)?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.mp3(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.ts'],
        alias: {
            'vue': 'vue/dist/vue.esm.js'
        }
    }
};