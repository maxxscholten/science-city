module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      dist: {
        files: {
          'assets/styles/css/main.css' : 'assets/styles/scss/main.scss'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'assets/js/*.js']
    },
    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')({
                    browsers: ['last 2 versions']
                })
            ]
        },
        dist: {
            src: 'assets/styles/css/*.css'
        }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint'],
      css: {
        files: 'assets/styles/scss/*.scss',
        tasks: ['sass']
      }
    }
  });
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['watch']);
};