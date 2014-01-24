'use strict';
var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
module.exports = function (grunt) {
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    // show elapsed time at the end
    require('time-grunt')(grunt);

    // configurable paths
    var yeomanConfig = {
        app: '',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        // watch list
        watch: {
            options: {
                nospawn: true,
                livereload: true
            },
            livereload: {
                files: [
                    'scripts/**/*.js',
                    'templates/{,**/}*.hbs',
                    'test/spec/**/*.js',
                    'index.html'
                ]
            },
            compass: {
                files: ['styles/**/*.scss'],
                tasks: ['compass']
            },
            /* not used at the moment
            handlebars: {
                files: [
                    '/templates/*.hbs'
                ],
                tasks: ['handlebars']
            }*/
        },

        // testing server
        connect: {
            options: {
                port: SERVER_PORT,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, yeomanConfig.dist)
                        ];
                    }
                }
            }
        },

        compass: {
            options: {
                sassDir: 'styles',
                cssDir: '.tmp/styles',
                imagesDir: 'images',
                javascriptsDir: 'scripts',
                fontsDir: 'styles/fonts',
                importPath: 'bower_components',
                relativeAssets: true
            },
            dist: {},
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        clean: {
            dist: ['.tmp', '<%= yeoman.dist %>/*'],
            server: '.tmp'
        },

        // linting
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'scripts/**/*.js',
                '!scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        requirejs: {
            dist: {
                // Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
                options: {
                    baseUrl: 'scripts',
                    optimize: 'none',
                    paths: {
                        templates: '../.tmp/scripts/templates',
                        jquery: '../bower_components/jquery/jquery',
                        underscore: '../bower_components/underscore-amd/underscore',
                        backbone: '../bower_components/backbone-amd/backbone',

                        /* alias all marionette libs */
                        'backbone.marionette': '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette',
                        'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr',
                        'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter',

                        /* alias the bootstrap js lib */
                        bootstrap: 'vendor/bootstrap',

                        /* Alias text.js for template loading and shortcut the templates dir to tmpl */
                        text: '../bower_components/requirejs-text/text',
                        tmpl: "../templates",

                        /* handlebars from the require handlerbars plugin below */
                        handlebars: '../bower_components/require-handlebars-plugin/Handlebars',

                        /* require handlebars plugin - Alex Sexton */
                        i18nprecompile: '../bower_components/require-handlebars-plugin/hbs/i18nprecompile',
                        json2: '../bower_components/require-handlebars-plugin/hbs/json2',
                        hbs: '../bower_components/require-handlebars-plugin/hbs'
                    },
                    // TODO: Figure out how to make sourcemaps work with grunt-usemin
                    // https://github.com/yeoman/grunt-usemin/issues/30
                    //generateSourceMaps: true,
                    // required to support SourceMaps
                    // http://requirejs.org/docs/errors.html#sourcemapcomments
                    preserveLicenseComments: false,
                    useStrict: true,
                    wrap: true
                    //uglify2: {} // https://github.com/mishoo/UglifyJS2
                }
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/**/*.css',
                        'styles/**/*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'images/{,*/}*.{webp,gif}',
                        'styles/fonts/{,*/}*.*',
                        'bower_components/sass-bootstrap/fonts/*.*'
                    ]
                }]
            }
        },
        bower: {
            all: {
                rjsConfig: 'scripts/init.js'
            }
        },

        // handlebars
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST',
                    amd: true
                },
                files: {
                    '.tmp/scripts/templates.js': ['templates/**/*.hbs']
                }
            }
        }
    });

    grunt.registerTask('createDefaultTemplate', function () {
        grunt.file.write('.tmp/scripts/templates.js', 'this.JST = this.JST || {};');
    });

    // starts express server with live testing via testserver
    grunt.registerTask('default', function (target) {

        grunt.task.run([
            'clean:server',
            'compass:server',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean',
        'createDefaultTemplate',
        'handlebars',
        'compass:dist',
        'useminPrepare',
        'requirejs',
        'imagemin',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin'
    ]);

};
