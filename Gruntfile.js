/* 
  Starter Grunt File
*/

var jsPath = 'build/assets/js/main.js';
var jsLibPath = 'build/assets/js/lib/*.js';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'public/assets/css/main.css': 'build/assets/css/main.scss'
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

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['sass', 'jshint', 'concat', 'uglify', 'imagemin']);

  grunt.registerTask('dev', ['connect', 'watch']);

};