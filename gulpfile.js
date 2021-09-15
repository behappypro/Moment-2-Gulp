const {src, dest, parallel, series, watch} = require("gulp");
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const livereload = require('gulp-livereload');

// Sökvägar

const files = {
    // Nedanstående är platser där vi vill läsa våra filer från
    htmlPath: "src/**/*.html",
    cssPath: "src/css/*.css",
    jsPath: "src/js/*.js",
    imagePath: "src/images/*"
}

// HTML-Task, kopierar HTML
function copyHTML(){
    // läser in alla html filer
    return src(files.htmlPath)
    // Metod för att skriva till pub mappen
    .pipe(dest('pub'))
    // Metod för att ladda om browsern
    .pipe(livereload());
}

// CSS task
function cssTask(){
    // läser in alla css filer
    return src(files.cssPath)
    // Slår ihop alla css filer till en
    .pipe(concat('main.css'))
    // Minify CSS
    .pipe(cssnano())
    // Skriver nya filerna till css mappen
    .pipe(dest('pub/css'))
}

// JS task
function jsTask(){
    return src(files.jsPath)
    // Metod för att slå ihop js-filer till ett
    .pipe(concat('main.js'))
    // Minify JS genom att tag bort onödiga rader och kommentarer
    .pipe(terser())
    .pipe(dest('pub/js'));
}
// Image task
function imageTask(){
    return src(files.imagePath)
    // Komprimerar bilder
    .pipe(imagemin())
    .pipe(dest('pub/images'));
}

// Watch  task
function watchTask(){
    livereload.listen();
    // Håller koll på våra filer och känner av när något ändras
    watch([files.htmlPath,files.cssPath,files.jsPath,files.imagePath],copyHTML,cssTask,jsTask,imageTask);
}


exports.default = series(
    // kör nedanstående task parallet för att sedan även köra watchtask
    parallel(copyHTML,cssTask,jsTask,imageTask),
    watchTask
);
