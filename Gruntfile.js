module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    // compass: {                  // Task
    //   dist: {                   // Target
    //     options: {              // Target options
    //       sassDir: 'scss',
    //       cssDir: 'css',
    //       force: true,
    //       require: 'zurb-foundation',
    //       environment: 'production'
    //     }
    //   },
    //   dev: {                    // Another target
    //     options: {
    //       sassDir: 'scss',
    //       cssDir: 'css',
    //       force: true,
    //       require: 'zurb-foundation'
    //     }
    //   }
    // },


    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dev:{
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'css/app.css': 'scss/app.scss'
        }        
      }
    },

    watch: {
      grunt: { files: ['Gruntfile.js'] },
      // compass: {
      //   files: ['/styles/{,*/}*.{scss,sass}'],
      //   tasks: ['compass']
      // },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass:dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  // grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('build', ['sass:dist']);
  grunt.registerTask('default', ['sass:dev','watch']);
}