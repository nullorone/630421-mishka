"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var del = require("del");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var sprite = require("gulp-svgstore");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(csso({sourceMap: true}))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("clear", function() {
  return del("build");
});

gulp.task("imagemin", function() {
  return gulp.src("source/img/*.{jpg,svg}")
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/*.jpg")
    .pipe(webp())
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/js/*.js"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("copyHtml", function() {
  return gulp.src("source/*.html", {base: "source"})
    .pipe(gulp.dest("build"));
});

gulp.task("sprite", function() {
  return gulp.src("source/img/icon-*.svg")
    .pipe(sprite())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("image-optimize", gulp.series("imagemin", "webp", "sprite"));

gulp.task("refresh", function(done) {
  server.reload;
  done();
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("copyHtml", "refresh"));
});

gulp.task("build", gulp.series(
  "clear",
  "css",
  "copy",
  "copyHtml",
  "image-optimize"
  ));

gulp.task("start", gulp.series("build", "server"));
