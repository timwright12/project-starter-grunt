/* 
  Starter Grunt File
*/

var jsPath = 'build/assets/js/main.js';
var jsLibPath = 'build/assets/js/lib/*.js';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dev: {
        options: {
          lineNumbers: true,
          style: 'expanded'
        },
        files: {
          'public/assets/css/main.css': 'build/assets/css/main.scss'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/assets/css/main.min.css': 'build/assets/css/main.scss'
        }
      }
    },

    jshint: {
      beforeconcat: ['build/assets/js/*.js']
    },

    concat: {
      dist: {
        src: [
          jsLibPath,
          jsPath
        ],
        dest: 'public/assets/js/app.js',
      }
    },

    uglify: {
      build: {
        src: 'public/assets/js/app.js',
        dest: 'public/assets/js/app.min.js'
      }
    },

    jekyll: {
      dev: {
        src: 'build/jekyll',
        dest: 'build/jekyll/_site'
      }
    },
    
    copy: {
      jekyll: {
        files: [
          {
            'expand': true,
            'cwd': 'build/jekyll/_site',
            'src': ['**/*.html'],
            'dest': 'public'
          }
        ]
      },
      fonts: {
        files: [{
            'expand': true,
            'cwd': 'build/assets/fonts',
            'src': ['**/*.{eot,ttf,woff,svg}'],
            'dest': 'public/assets/fonts'
        }]
      }
    },
    
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'build/assets/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'public/assets/images/'
        }]
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      scripts: {
        files: ['build/assets/js/*.js'],
        tasks: ['concat', 'uglify', 'jshint'],
        options: {
          spawn: false,
        }
      },
      css: {
        files: ['build/assets/css/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        }
      },
      jekyll: {
        files: [
          'build/jekyll/**/*.html',
          '!build/jekyll/_site/**/*.html'
        ],
        tasks: ['jekyll', 'copy:jekyll']
      },
      images: {
        files: ['build/assets/images/**/*.{png,jpg,gif}', 'build/assets/images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false,
        }
      }
    }

  });

  require('load-grunt-tasks')(grunt);
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');
  
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('dev', ['sass', 'jekyll', 'copy:jekyll','copy:fonts', 'jshint', 'concat', 'uglify', 'imagemin']);

};