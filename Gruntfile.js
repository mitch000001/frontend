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
            sass: {
              files: 'styles/**/*.scss',
              tasks: ['sass']
            },
            // compass: {
            //     files: ['styles/**/*.scss'],
            //     tasks: ['compass']
            // },
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
                            mountFolder(connect, yeomanConfig.app),
                            mountFolder(connect, 'bower_components/foundation-icon-fonts')
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

        sass: {
          options: {
            includePaths: [
                'bower_components/foundation/scss',
                'bower_components/foundation-icon-fonts',
                'bower_components'
            ]
          },
          dist: {
            options: {
              outputStyle: 'compressed'
            },
            files: {
              '.tmp/styles/main.css': 'styles/main.scss'
            }
          }
        },

        // compass: {
        //     options: {
        //         sassDir: 'styles',
        //         cssDir: '.tmp/styles',
        //         imagesDir: 'images',
        //         javascriptsDir: 'scripts',
        //         fontsDir: 'styles/fonts',
        //         importPath: ['bower_components/foundation/scss', 'bower_components'],
        //         relativeAssets: true,
        //     },
        //     dist: {},
        //     server: {
        //         options: {
        //             debugInfo: true
        //         }
        //     }
        // },

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

        uglify: {
            options: {
                beautify: true,
                mangle: {
                    except: ['jQuery', 'Backbone']
                }
            },
        },

        requirejs: {
            dist: {
                options: {
                    baseUrl: 'scripts',
                    mainConfigFile: 'scripts/init.js',
                    optimize: 'none'
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
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '',
                    dest: '<%= yeoman.dist %>',
                    src: ['fixtures/**']
                }, {
                    expand: true,
                    dot: true,
                    cwd: '',
                    dest: '<%= yeoman.dist %>',
                    src: ['locales/*.json']
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'bower_components/foundation-icon-fonts/',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ttf,eot,woff,svg}'
                    ]
                }]
            }
        },

        bower: {
            all: {
                rjsConfig: 'scripts/init.js'
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
            'sass',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('build', [
        'clean',
        'createDefaultTemplate',
        'sass',
        'useminPrepare',
        'requirejs',
        'htmlmin',
        'concat',
        'cssmin',
        'uglify',
        'copy',
        'usemin'
    ]);

};
