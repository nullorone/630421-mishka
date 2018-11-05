"use strict";

var gulp = require("gulp");
var pump = require("pump");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");
var del = require("del");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var notify = require("gulp-notify");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var sprite = require("gulp-svgstore");
var htmlmin = require("gulp-htmlmin");
var server = require("browser-sync").create();

gulp.task("css", function() {
  return gulp
    .src("source/sass/style.scss")
    .pipe(
      plumber({
        errorHandler: notify.onError(function(err) {
          return {
            title: "Styles",
            message: err.message
          }
        })
      })
    )
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(csso({ sourceMap: true }))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function() {
    return gulp
        .src("source/*.html")
        .pipe(sourcemaps.init())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("build"))
        .pipe(server.stream());
});

gulp.task("clear", function() {
  return del("build");
});

gulp.task("imagemin", function() {
  return gulp
    .src("source/img/*.{jpg,svg}")
    .pipe(imagemin([
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function() {
  return gulp
    .src("source/img/*.jpg")
    .pipe(webp())
    .pipe(gulp.dest("build/img"));
});

gulp.task("copy:fonts", function() {
  return gulp
    .src(["source/fonts/**/*.{woff,woff2}"], { base: "source" })
    .pipe(gulp.dest("build"));
});

gulp.task("copy:favicon", function() {
  return gulp
    .src(["source/img/favicon.ico"], { base: "source" })
    .pipe(gulp.dest("build"));
});

gulp.task("js", function(cb) {
  return pump([
    gulp.src("source/js/*.js", { base: "source" }),
    sourcemaps.init(),
    uglify(),
    sourcemaps.write(),
    rename({ suffix: ".min"}),
    gulp.dest("build"),
    server.stream()
      ],
    cb
  );
});

gulp.task("sprite", function() {
  return gulp
    .src("source/img/icon-*.svg")
    .pipe(sprite())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("image-optimize", gulp.series("imagemin", "webp", "sprite"));

// gulp.task("refresh", function(done) {
//   server.reload();
//   done();
// });

gulp.task("server", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("source/js/*.js", gulp.series("js"));
});

gulp.task(
  "build",
  gulp.series(
    "clear",
    "copy:fonts",
    "copy:favicon",
    "image-optimize",
    "css",
    "html",
    "js"
  )
);

gulp.task("start", gulp.series("build", "server"));
