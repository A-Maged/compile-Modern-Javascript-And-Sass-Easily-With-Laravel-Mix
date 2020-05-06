const glob = require('glob');
const mix = require('laravel-mix');

/*
 * Extend laravel mix to add more functionalities
 * Must come after "mix" is defined
 */
require('mix-tailwindcss');
require('laravel-mix-purgecss');

/* compile scss files into seperate css files */
glob.sync('src/style/blocks/**/*.scss').forEach((file_path) => {
    mix.sass(file_path, 'build/blocks/');
});

mix.js('src/js/index.js', 'build')
    .sass('src/style/style.scss', 'build')
    .tailwind() /* Add tailwind classes */
    .purgeCss({
        enabled: true,
        content: [
            '**/*.html',
            '**/*.php',
            '**/*.twig',
        ] /* Remove unused CSS in files with these extensions */,
    })
    .sourceMaps(
        !mix.inProduction(),
        'source-map'
    ) /* Only add source maps if not building for production */
    .browserSync({
        proxy: process.env.URL,
        files: [
            './**/*.twig',
            './**/*.php',
            './**/*.js',
            './**/*.scss',
        ] /* Reload if any file with one of these extensions is changed */,
        ignore: ['./.git', './**/node_modules', './build', './vendor'],
    })
    .disableSuccessNotifications(); /* Don't alert when build is successful (because it gets annoying over time) */
