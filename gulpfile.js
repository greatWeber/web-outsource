// 引入 gulp 和 gulp-watch 模块
var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
var babel = require('gulp-babel')

// 编译 js 文件
gulp.task('js', function () {
    // 这里填写 js 编译的代码
    
});

function jsTask(){
    return gulp
    .src('src/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('js'))
}

// 编译 less 文件
gulp.task('less', function () {
    // 这里填写 less 编译的代码
    gulp.src('src/css/*.less').pipe(less()).pipe(gulp.dest('css'))
});

function lessTask(){
    return gulp.src('src/css/*.less').pipe(less()).pipe(gulp.dest('css'))
}

// 监听文件变化
gulp.task('watch', function () {
    
});

function watchTask(){
    return  function(){
        // 监听 js
        watch('./src/**/*.js', jsTask);

        // 监听 less
        watch('./src/**/*.less', lessTask);
    }
   
}

// 默认任务
// gulp.task('default',  gulp.parallel(jsTask,lessTask,watchTask));
exports.default = function() {
    // 监听 js
    watch('./src/**/*.js', jsTask);

    // 监听 less
    watch('./src/**/*.less', lessTask);
  };