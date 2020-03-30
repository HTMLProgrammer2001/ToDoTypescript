const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const del = require('del');
const sourceMap = require('gulp-sourcemaps');
const eslint = require('gulp-eslint');
const browserSync = require('browser-sync').create();

const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');
const webpack = require('webpack');

sass.compiler = require('node-sass');

function css(){
	return gulp.src('./src/css/*.css', {
		allowEmpty: true
	})
		.pipe(concat('bundle.css'))
		.pipe(sourceMap.init())
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(sourceMap.write())
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
}

function scss(){
	return gulp.src('./src/scss/main.scss', {
		allowEmpty: true
	})
		.pipe(sourceMap.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('bundle.css'))
		.pipe(autoprefixer())
		.pipe(cleanCSS())
		.pipe(sourceMap.write())
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
}

function js(mode){
	return function javascript(){
		return gulp.src('./src/js/main.tsx', {
			allowEmpty: true
		})
			.pipe(sourceMap.init())
			.pipe(eslint())
			.pipe(eslint.formatEach('compact', process.stderr))
			.pipe(eslint.failAfterError())
			.pipe(webpackStream({
				...webpackConfig,
				mode
			}), webpack)
			.pipe(concat('bundle.js'))
			.pipe(sourceMap.write())
			.pipe(gulp.dest('./dist/js'))
			.pipe(browserSync.stream());
	};
}

function image() {
	return gulp.src('./src/image/**/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('./dist/image/'))
		.pipe(browserSync.stream());
}

function html() {
	return gulp.src('./src/pages/*.html')
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.stream());
}

function clean(){
	return del('./dist');
}

function watch(){
	browserSync.init({
		server: {
			baseDir: './dist'
		}
	});

	gulp.watch('./src/pages/**/*.html', html).on('change', browserSync.reload);
	gulp.watch('./src/scss/**/*.scss', scss);
	gulp.watch('./src/css/**/*.css', css);
	gulp.watch('./src/js/**/*.js', js('development'));
}

function build(){
	return gulp.series(clean, gulp.parallel(
		html, css, scss, js('production'), image
	));
}

gulp.task('css', css);
gulp.task('scss', scss);
gulp.task('html', html);
gulp.task('js', js('production'));
gulp.task('image', image);
gulp.task('watch', watch);
gulp.task('build', build());
gulp.task('default', build());
