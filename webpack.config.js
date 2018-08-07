let path = require('path');
let webpack = require('webpack');
let HWP = require('html-webpack-plugin');
const COMPONENT = path.resolve(__dirname, 'Component');
const ACTION = path.resolve(__dirname, 'Action');
const ENUM = path.resolve(__dirname, 'Enum');
let config =
    {
        mode: 'development',
        plugins:
            [
                new HWP(
                    {
                        title: 'Redux Lessons',
                        template: 'index.ejs',
                        inject: 'body',
                        filename: '../index.html'
                    }
                )
            ],
        node: {
            __dirname: true,
            __filename: true
        },
        entry: {
            main: COMPONENT + '/Bootstrapper/Main.jsx'
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                //<editor-fold desc="Component Aliases"
                Container: COMPONENT + '/Container',
                Presentational: COMPONENT + '/Presentational',
                Storage: COMPONENT + '/Storage',
                //</editor-fold>
                //<editor-fold desc="Action Aliases"
                Submit: ACTION + '/Submit',
                Delete: ACTION + '/Delete',
                //</editor-fold>
                //<editor-fold desc="Enum Aliases"
                Enum: ENUM
                //</editor-fold>
            }
        },
        module: {
            rules: [
                {
                    test: /\.js(x)$/,
                    use: {
                        loader: "babel-loader",
                        options:
                            {
                                presets:
                                    [
                                        'babel-preset-env',
                                        'babel-preset-react'
                                    ],
                                plugins:
                                    [
                                        require('babel-plugin-transform-object-rest-spread'),
                                        require('babel-plugin-transform-class-properties'),
                                        require('babel-plugin-syntax-dynamic-import'),
                                        require('babel-plugin-transform-runtime')
                                    ]
                            }
                    }
                }
            ]
        }

    };

module.exports = config;