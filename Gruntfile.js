// Generated on 2014-10-21 using
// generator-webapp 0.5.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {


	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	var style = require('grunt-cmd-transport').style.init(grunt);

	// Configurable paths
	var config = {
		app: 'app',
		dist: 'dist'
	};

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		config: config,

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['app/**/*.js'],
				// tasks: ['jshint'],
				options: {
					livereload: true
				}
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			sass: {
				files: ['app/**/*.{scss,sass}'],
				tasks: ['sass:server', 'autoprefixer']
			},
			styles: {
				files: ['app/**/*.css'],
				tasks: ['autoprefixer']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'app/**/*.html',
					'app/**/images/**/*',
					'app/**/*.js',
					'app/**/*.css',
				]
			},
			template: {
				files: ['app/**/templates/**/*.html'],
				tasks: ['tmod']
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				// Change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect().use('/posters', connect.static('app')),
							connect().use('/posters', connect.static('.tmp')),
							connect().use('/bower_components', connect.static('./bower_components')),
							connect.static(config.app),
						];
					}
				}
			},
			test: {
				options: {
					open: false,
					port: 9001,
					middleware: function(connect) {
						return [
							connect.static('.tmp'),
							connect.static('test'),
							connect().use('/bower_components', connect.static('./bower_components')),
							connect.static(config.app)
						];
					}
				}
			},
			dist: {
				options: {
					base: '<%= config.dist %>',
					livereload: false,
					middleware: function(connect) {
						return [
							connect.static(config.dist),
							connect().use('/posters', connect.static('dist')),
						];
					}
				}
			}
		},

		// Empties folders to start fresh
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= config.dist %>/*'
					]
				}]
			},
			server: '.tmp'
		},

		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'app/scripts/**/*.js',
				'test/spec/{,*/}*.js'
			]
		},

		// Mocha testing framework configuration options
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/**/*.html']
				}
			}
		},

		// cmd-transport
		transport: {
			options: {
				paths: ['app'],
				debug: false,
				alias: {
					helper: "scripts/helper",
					ajax: "scripts/ajax",
					browser: "scripts/browser",
					UserAuth: "scripts/UserAuth",
					service: "scripts/service"
				}
			},
			release: {
				files: [{
					expand: true,
					cwd: 'app',
					src: [
						'scripts/**/*.js',
						'2016/monkey/index.js'
					],
					dest: 'dist'
				}]
			}
		},

		// Compiles Sass to CSS and generates necessary files if requested
		sass: {
			options: {
				loadPath: [
					'bower_components'
				]
			},
			dist: {
				files: [{
					expand: true,
					ext: '.css',
					cwd: 'app/2016/monkey/styles',
					src: ['*.scss'],
					dest: '.tmp/2016/monkey/styles',
				}]
			},
			server: {
				files: [{
					expand: true,
					ext: '.css',
					cwd: 'app/2016/monkey/styles',
					src: ['*.scss'],
					dest: '.tmp/2016/monkey/styles',
				}]
			}
		},

		// Add vendor prefixed styles
		autoprefixer: {
			options: {
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'ie 8', 'ie 9', 'ie 10', 'ie 11']
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'app/2016/monkey/styles',
					src: ['*.css'],
					dest: 'app/2016/monkey/styles'
				}]
			}
		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'dist/2016/**/vendor.js',
						'dist/2016/monkey/styles/index.css'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			options: {
				dest: 'dist'
			},
			html: 'app/**/*.html'
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			options: {
				assetsDirs: [

				]
			},
			html: ['dist/**/*.html'],
			css: ['dist/**/*.css']
		},

		htmlmin: {
			dist: {
				options: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					conservativeCollapse: true,
					removeAttributeQuotes: true,
					removeCommentsFromCDATA: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true,
					removeRedundantAttributes: true,
					useShortDoctype: true
				},
				files: [{
					expand: true,
					cwd: 'dist',
					src: ['**/*.html', '!dist/templates/'],
					dest: 'dist'
				}]
			}
		},

		// By default, your `index.html`'s <!-- Usemin block --> will take care
		// of minification. These next options are pre-configured if you do not
		// wish to use the Usemin blocks.
		cssmin: {
			dist: {
				files: [{
					expand: true,
					cwd: "dist",
					dest: "dist",
					src: ["**/styles/**.css"]
				}]
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= grunt.template.today("yyyy-mm-dd") %> build by picker */\n'
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'dist',
					src: ['**/*aaa.js'],
					dest: 'dist'
				}]
			}
		},
		concat: {
			options: {
				include: 'relative',
				css2js: style.css2js,
				noncmd: true
			},
			dist: {
				files: {
					'dist/scripts/public.js': [
						'dist/scripts/*.js'
					]
				}
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'app',
					dest: 'dist',
					src: [
						'**/*.*',
						"**/*.js",
						"!**/templates/**/*.html",
						"!**/*.scss",
						"!**/.cache/",
					]
				}, {
					expand: true,
					dot: true,
					cwd: '.tmp',
					dest: 'dist',
					src: [
						'**/template.js',
						"**/*.css"
					]
				}]
			},
			dest: {
				files: [{
					expand: true,
					dot: true,
					cwd: '.tmp/monkey',
					dest: 'dist/2016/monkey',
					src: [
						'**/vendor.js'
					]
				}]
			}
		},

		// Run some tasks in parallel to speed up build process
		concurrent: {
			server: [
				'sass:server',
				'tmod'
			],
			test: [

			],
			dist: [
				'sass:dist',
				'tmod'
			]
		},
		// TmodJs to Compile
		tmod: {
			options: {
				combo: true,
				syntax: 'simple',
				minify: true,
				cache: false,
				debug: true
			},
			template: {
				src: ['app/2016/monkey/templates/**/*.html'],
				dest: '.tmp/2016/monkey/template.js'
			}
		}
	});


	grunt.registerTask('serve', 'start the server and preview your app, --allow-remote for remote access', function(target) {
		if (grunt.option('allow-remote')) {
			grunt.config.set('connect.options.hostname', '0.0.0.0');
		}
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			//'wiredep',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('server', function(target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run([target ? ('serve:' + target) : 'serve']);
	});

	grunt.registerTask('test', function(target) {
		if (target !== 'watch') {
			grunt.task.run([
				'clean:server',
				'concurrent:test',
				'autoprefixer'
			]);
		}

		grunt.task.run([
			'connect:test',
			'mocha'
		]);
	});

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'copy:dist',
		'transport',
		'concat',
		'copy:dest',
		//压缩js文件
		'uglify',

		'cssmin',

		// 静态资源替换
		'rev',
		'usemin',
		'htmlmin',
	]);

	grunt.registerTask('default', [
		'newer:jshint',
		'test',
		'build'
	]);
};