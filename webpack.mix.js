let mix = require('laravel-mix')
require('./nova.mix')

mix.setPublicPath('dist')
    .js('resources/js/field.js', 'js')
    .vue({version: 3 })
    .nova('ml-solutions-ltda/nova-phone-field');
