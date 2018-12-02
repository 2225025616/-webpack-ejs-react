var ejs = require("gulp-ejs");
var gzip = require("gulp-gzip");
var print = require("gulp-print");
var env = require("./env");
var gulp = require("gulp");
var clean = require("gulp-clean");
var gutil = require("gulp-util");
var webpack = require("webpack");
var ejsHelper = require("./ejsHelper");
var gulpSequence = require('gulp-sequence');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var htmlmin = require('gulp-htmlmin');

var config = {
  production: env.production,
  html_tag: ejsHelper.html_tag,
  javascript_initial_state: ejsHelper.javascript_initial_state,
  image_tag: ejsHelper.image_tag,
  stylesheet_link_tag: ejsHelper.stylesheet_link_tag,
  javascript_tag: ejsHelper.javascript_tag,
  backend_javascript_tag: ejsHelper.backend_javascript_tag
};

gulp.task("webpack", function () {
  webpack(
    require("./webpack.config.js")
    , function (err, stats) {
      gutil.log('[webpack.build]', stats.toString({chunks: false, colors: true}));
    });
});

gulp.task("compress", function () {
    var pathPrefix = "./dist/www/**/*.";
    var paths = [
      pathPrefix + "js",
      pathPrefix + "html",
      pathPrefix + "css",
      pathPrefix + "svg",
    ]
    gulp.src(paths).pipe(gzip({threshold: 2000, gzipOptions: 9})).pipe(gulp.dest("./dist/www"));
  }
);

gulp.task("generate-html", function () {
  var html = gulp.src(['./src/views/**/*.ejs', '!./src/views/**/_*.ejs'])
    .pipe(ejs(config, {}, {ext: ".html"}))

  if (process.env.NODE_ENV === "production") {
    html = html.pipe(htmlmin({
      removeComments: true,//清除HTML注释
      collapseWhitespace: false,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
      minifyJS: true,//压缩页面JS
      minifyCSS: true//压缩页面CSS
    }));
  }

  html.pipe(gulp.dest("./dist/www"));
});

gulp.task("copy-js", function () {
  var javascript = gulp.src(
    ["./node_modules/jquery/dist/jquery.js", "./node_modules/es6-shim/es6-shim.js", "./src/javascripts/components/admins/zh_CN.js"]);

  if (process.env.NODE_ENV === "production") {
    javascript.pipe(uglify()).pipe(rev()).pipe(gulp.dest("./dist/www/js")).pipe(rev.manifest("javascript-manifest.json")).pipe(gulp.dest('dist'));
  } else {
    javascript.pipe(gulp.dest("./dist/www/js"));
  }
});

gulp.task("copy-files", function () {
  gulp.src(["./src/assets/**", "src/fonts/**"], {base: "./src"}).pipe(gulp.dest("./dist/www"));
  gulp.src(["./config/**"]).pipe(gulp.dest("./dist/config"));

  var images = gulp.src(["./src/images/**"], {base: "./src"});

  if (process.env.NODE_ENV === "production") {
    images.pipe(rev()).pipe(gulp.dest("./dist/www")).pipe(rev.manifest("image-manifest.json")).pipe(gulp.dest('dist'));
  }
  else {
    images.pipe(gulp.dest("./dist/www"));
  }
});

gulp.task("clean", function () {
  return gulp.src("./dist", {read: false}).pipe(clean());
});

gulp.task('prepare', gulpSequence('clean', ['copy-js', 'copy-files']));
gulp.task('build', gulpSequence('generate-html', 'compress'));

gulp.task('build-all', gulpSequence('prepare', 'build', 'webpack'));
