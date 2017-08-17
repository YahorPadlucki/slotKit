var gulp = require("gulp");
const webpack = require('webpack');
const webpackConfigName = './webpack.config.js';
const webpackConfig = require(webpackConfigName);

const webpackStream = require('webpack-stream');

gulp.task("default", ()=>gulp.src('src/Main.ts').pipe(webpackStream(webpackConfig, webpack)).pipe(gulp.dest("./")));