/*
 * @Author: junshi clayton.wang@gmail.com
 * @Date: 2024-03-02 15:30:25
 * @LastEditors: junshi clayton.wang@gmail.com
 * @LastEditTime: 2024-03-02 18:30:25
 * @Description:
 */

/* eslint-disable */
const webpack = require('webpack');
const path = require("path");
const { merge } = require('webpack-merge');
const base = require('./webpack.base.config.js');
const { apiPrefix } = require('../src/common/utils/config');

const proxy = {
  target: 'http://localhost:8080/',
  changeOrigin: true,
  headers: {
    Host: 'localhost:8080',
  },
};

module.exports = merge(base, {
  mode: 'development',
  devtool: "eval-cheap-module-source-map",
  optimization: {
    chunkIds: 'size',
  },
  

  devServer: {
    static: {
      directory: path.resolve("./","public/"),
    },
    hot: true,
    port: 9000,
    open: true,
    compress: false,
    historyApiFallback: true,
    proxy: {
      logLevel: 'debug',
      [apiPrefix]: proxy,
    },
  },
});
