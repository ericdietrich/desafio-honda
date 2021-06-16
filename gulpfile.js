//Importar plugins do GULP e jogar cada um deles em uma constante para usar elas
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
// AUTOMAÇÃO DA TAREFA DO SCSS EM CSS
function scssTask() {
      return src('src/scss/app.scss', { sourcemaps: true })
            .pipe(sass())
            .pipe(postcss([cssnano()]))
            .pipe(concat('all.css'))
            .pipe(dest('dist/css', { sourcemaps: '.' }))
            .pipe(browsersync.stream())
}

// function cssTask() {
//       return src('css/**/*.css', { sourcemaps: true })
//             .pipe(browsersync.stream())
// }



// AUTOMAÇÃO DO JAVASCRIPT 
function jsTask() {
      return src('src/app/**/*.js', { sourcemaps: true })
            .pipe(terser())
            .pipe(dest('dist/js', { sourcemaps: '.' }))
            .pipe(browsersync.stream());
}
// AUTOMAÇÃO DAS LIBS DO JAVASCRIPT, TODAS COMPILADAS NUM ARQUIVO SÓ ALL.JS 
function jsLibTask() {
      return src('src/lib/**/*.js', { sourcemaps: true })
            .pipe(terser())
            .pipe(concat('all.js'))
            .pipe(dest('dist/js', { sourcemaps: '.' }))
            .pipe(browsersync.stream());
}
//Gera versões das imagens minificadas otimizadas com baixo tamanho e também gera os .webp das imagens
function imageMin() {
      return src('src/images/**/*')
            .pipe(imagemin())
            .pipe(webp())
            .pipe(dest('dist/images'));
} 
//browser SYNC auto reload do navegador apos salvar 
function browsersyncServe(cb) {
      browsersync.init({
            proxy: "localhost/isentrega_blog" // put your local website link here
      });
      cb();
}
function browsersyncReload(cb) {
      browsersync.reload();
      cb();
}
// Tarefa de WATCH, para assistir alterações 
function watchTask() {
      //Ao notar qualquer mudança no HTML, executar função browser Sync Reload 
      watch('*.html', browsersyncReload);
      watch('*.css', browsersyncReload);
      watch('*.php', browsersyncReload);
      watch(['src/scss/**/*.scss', 'src/app/**/*.js', 'src/lib/**/*.js', 'css/**/*.css'], series(scssTask, jsTask, browsersyncReload));
}
//Tarefa padrão do gulp 
exports.default = series(
      scssTask,
      // cssTask,
      jsTask,
      jsLibTask,
      imageMin,
      browsersyncServe,
      watchTask
);
