# Moment-2-Gulp

Detta moment bygger på automatisering genom GULP.
Automatisering är att vi skriver kod för att datorn skall utföra vissa task åt oss automatiskt. Detta är praktiskt om vi exempelvis vill att alla bilder skall komprimeras utan att vi gör någonting. Då kan vi installera en metod som automatiserar denna process åt oss. 

OBS! Många av de funktioner som använts är tagna från föreläsningen för Moment 2.

Detta GULP-moment Innehåller följande paket:

* gulp-concat
* gulp-terser
* gulp-cssnano
* gulp-imagemin
* gulp-livereload

Jag har valt dessa paket för vissa av dessa paket var som krav för uppgiften men andra lades till för utforska mer med vad gulp kunde automatisera.

Nedanstående är funktioner och metoder som detta moment använder:

```
const files = {
    // Nedanstående är platser där vi vill läsa våra filer från
    htmlPath: "src/**/*.html",
    cssPath: "src/css/*.css",
    jsPath: "src/js/*.js",
    imagePath: "src/images/*"
}
```

```
function copyHTML(){
    // läser in alla html filer
    return src(files.htmlPath)
    // Metod för att skriva till pub mappen
    .pipe(dest('pub'))
    // Metod för att ladda om browsern
    .pipe(livereload());
}
```

```
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
```

```
function jsTask(){
    return src(files.jsPath)
    // Metod för att slå ihop js-filer till ett
    .pipe(concat('main.js'))
    // Minify JS genom att tag bort onödiga rader och kommentarer
    .pipe(terser())
    .pipe(dest('pub/js'));
}
```

```
function watchTask(){
    // Event som lyssnar efter uppdatering
    livereload.listen();
    // Håller koll på våra filer och känner av när något ändras
    watch([files.htmlPath,files.cssPath,files.jsPath,files.imagePath],copyHTML,cssTask,jsTask,imageTask);
}
```

```
exports.default = series(
    // kör nedanstående task parallet för att sedan även köra watchtask
    parallel(copyHTML,cssTask,jsTask,imageTask),
    watchTask
);
```

### Extra funktion

Denna funktion lades till som extra för att testa hur komprimering av bilder kan användas.

```
function imageTask(){
    return src(files.imagePath)
    // Komprimerar bilder
    .pipe(imagemin())
    .pipe(dest('pub/images'));
}
```

### Installation

* Installera Gulp lokalt/globalt på datorn genom kommandot npm install --global gulp-cli
* Installera alla paket från package.json med kommandot npm install
* För att starta automatiseringen och optimeringen kan kommandot gulp anropas i terminalen ståendes i projektets mapp.
* Den färdiga webbsidan skickas till mappen pub och kan användas för publicering på lokal server.

