var gulp         =require('gulp'),
    concat       =require('gulp-concat'),
    sass         =require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug          =require("gulp-pug"),
    livereload   =require('gulp-livereload'),
    sourcemaps   =require('gulp-sourcemaps'),
    minify       = require('gulp-minify');


//html task
    gulp.task('html',function(){

        return gulp.src('sourcefile/html/*.pug')
                    .pipe(pug({
                        pretty:true
                    }))
                    .pipe(gulp.dest('dist'))
                    .pipe(livereload())
    });

    // css task

    gulp.task('css',function(){

        return gulp.src(['sourcefile/css/**/*.css','sourcefile/css/**/*.scss'])
                   .pipe(sourcemaps.init())
                    .pipe(sass({
                        outputStyle:'compressed'
                    }).on('error',sass.logError))
                    .pipe(autoprefixer()) //* under css task
                    .pipe(concat('main.css'))
                    .pipe(sourcemaps.write('.'))
                    .pipe(gulp.dest('dist/css'))
                    .pipe(livereload())
    });

    // *under css task

    // insteed of write it in ()for autpprefixer we should type this line in package.json file

    // "browserslist":[
    //     "last 2 version"," >2% "
    // ]
    // for js task

    gulp.task('js',function(){

        return gulp.src('sourcefile/js/*.js')
                    .pipe(concat('main.js'))
                    .pipe(minify())
                    .pipe(gulp.dest('dist/js'))
                    .pipe(livereload())
    });
    //watch tasks

    gulp.task('watch',function(){

        require('./server.js');
        livereload.listen();
        gulp.watch("sourcefile/html/**/*.pug" , ['html']);
        gulp.watch(["sourcefile/css/**/*.css" ,"sourcefile/css/**/*.scss"] , ['css']);
        gulp.watch("sourcefile/js/*.js" , ['js']);
    });
    

