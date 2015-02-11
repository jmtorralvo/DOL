'use strict';

// # Globbing
var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;


module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-connect-proxy');

    // Configurable paths for the application
    var appConfig = {
        host: 'localhost',
        app: require('./bower.json').appPath || 'app',
        dist: 'dist',
        dol: 'app/dol'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json']
            },
            js: {
                files: [
                    '<%= yeoman.dol %>/scripts/**/*.js',
                    '<%= yeoman.dol %>/scripts/directives/**/*.js',
                    '<%= yeoman.dol %>/modulos/**/*.js'
                ],
                tasks: [ /*'newer:jshint:all'*/ ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            compass: {
                files: ['<%= yeoman.dol %>/styles/**/*.scss'],
                tasks: ['compass:server' /*, 'autoprefixer'*/ ]
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.dol %>/modulos/**/*.html',
                    '.tmp/dol/styles/{,*/}*.css',
                    '<%= yeoman.dol %>/static/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 7000,
                hostname: '<%= yeoman.host %>',
                livereload: 35729
            },
            proxies: [{
                context: '/services/dol',
                host: '<%= yeoman.host %>',
                port: 8882

            }, {
                context: '/dol/i18n',
                host: '<%= yeoman.host %>',
                port: 8882

            }],
            livereload: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [
                            proxySnippet,
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    middleware: function(connect) {
                        return [
                            proxySnippet,
                            connect.static(appConfig.dist)
                        ];
                    }
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.app %>/dol/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/dol/modulos/{,*/}*.js',
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.dol %>/styles',
                cssDir: '.tmp/dol/styles',
                generatedImagesDir: '.tmp/dol/styles/images/generated',
                imagesDir: '<%= yeoman.dol %>/static/images',
                importPath: './bower_components',
                httpImagesPath: '/dol/static/images',
                httpGeneratedImagesPath: '/dol/styles/images/generated',
                fontsDir: '<%= yeoman.dol %>/static/fonts',
                httpFontsPath: '/dol/static/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/dol/styles/images/generated',
                }
            },
            server: {
                options: {
                    debugInfo: false
                }
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= yeoman.dist %>/scripts/{,*/}*.js',
                    '<%= yeoman.dist %>/styles/{,*/}*.css',
                    '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= yeoman.dist %>/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>', '<%= yeoman.dist %>/images']
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dol %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/dol/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'dol/views/{,*/}*.html', 'dol/scripts/directives/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // ngmin tries to make the code safe for minification automatically by
        // using the Angular long form for dependency injection. It doesn't work on
        // things like resolve or inject so those have to be done manually.
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },


        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'dol/views/{,*/}*.html',
                        'dol/static/images/spr/*.png',
                        'dol/static/{,*/}*',
                        'dol/modulos/**/*.html',
                        'dol/scripts/**/*.html' 
                    ]
                }]
            },
            bowerFonts: {
                expand: true,
                cwd: 'bower_components/bootstrap-sass-official/vendor/assets/fonts/bootstrap',
                dest: '<%= yeoman.app %>/dol/static/fonts',
                src: '*'
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        stubby: {
            stubsServer: {
                options: {
                    location: '<%= yeoman.host %>',
                    relativeFilesPath: true
                },
                files: [{
                    src: [
                        'app/mocks/**/*.json',
                        '!app/mocks/**/fixtures/*',
                    ]
                }]
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            dist: [
                'compass:dist',
                'imagemin',
                'svgmin'
            ]
        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'copy:bowerFonts',
            'configureProxies',
            'connect:livereload',
            'stubby',
            'jshint',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'ngmin',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('servedist', [
        'configureProxies',
        'connect:dist',
        'stubby',
        'watch'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'build'
    ]);
};
