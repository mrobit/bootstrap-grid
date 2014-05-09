module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    uglify: {
      dist: {
        files: {
          'assets/js/main.min.js' : [
            'bower_components/hammerjs/hammer.js',
            'assets/js/main.js'
          ],
          'assets/js/ie.js' : [
            'bower_components/respond/dest/respond.min.js',
            'bower_components/html5shiv/dist/html5shiv.js'
          ]
        }
      },
      options: {
        livereload: false
      }
    },
    // Sass task
    sass: {
      options: {
        // Get the bootstrap path for compiling.
        loadPath: ['bower_components/bootstrap-sass-official/vendor/assets/stylesheets'],
        quiet: true
      },
      dist: {
        options: {
          sourcemap: false,
          style: 'compressed'
        },
        files: {
          'assets/css/styles.min.css' : 'assets/scss/styles.scss'
        }
      }
    },
    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['sass', 'uglify']
      },
      sass: {
        files: 'assets/scss/**/*.scss',
        tasks: ['sass']
      },
      uglify: {
        files: 'assets/js/**/*.js',
        tasks: ['uglify']
      },
      livereload: {
        files: [
          '**/*.html',
          '**/*.php',
          '!contact/**/*.php',
          '!bower_components/**',
          'assets/js/**/*.js',
          'assets/css/**/*.css',
          'images/**/*.{jpg,gif,svg,jpeg,png}'
        ],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['sass', 'uglify']);

};
