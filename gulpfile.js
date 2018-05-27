var gulp = require("gulp");
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

gulp.task('BS', function() {
    browserSync.init({
    	server:{
    		baseDir: './dist/'
    	}
    })
});

gulp.task('copy-jquery', function() {
    return gulp.src('./node_modules/jquery/dist/jquery.slim.min.js')
      .pipe(gulp.dest('./dist/js/'))
});

gulp.task('copy-popper', function() {
    return gulp.src('./node_modules/popper.js/dist/popper.min.js')
      .pipe(gulp.dest('./dist/js/'))
});

gulp.task('copy-bootstrap-css', function() {
    return gulp.src('./node_modules/bootstrap/dist/css/bootstrap.min.css')
      .pipe(gulp.dest('./dist/css/'))
});

gulp.task('copy-bootstrap-js', function() {
    return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
      .pipe(gulp.dest('./dist/js/'))
});


//transferir arquivos html para a pasta dist
gulp.task('html', function() {
    return gulp.src('./src/*.html')
      .pipe(gulp.dest('./dist/'))
      .pipe(browserSync.stream())
});

//compila o sass e coloca para o css minificado
gulp.task('sass', function() {
    return gulp.src('./src/scss/style.scss')
      .pipe(sass({outputStyle:"compressed"}))
      .on("error", notify.onError("Error: <%= error.message %>"))
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./dist/css/'))
      .pipe(browserSync.stream())
});

// tarefa para ficar assistindo as mudanças feitas nos arquivos
gulp.task('background', function() {
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/scss/style.scss', ['sass']);
    gulp.watch('./src/scripts/js/*', ['js']);
});
			
gulp.task("default",['copy-jquery', 'copy-popper', 'copy-bootstrap-css', 'copy-bootstrap-js', 'html', 'sass', 'BS', 'background'], function() {});