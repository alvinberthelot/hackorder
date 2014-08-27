module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dist: 'dist',

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dev:{
        options: {
          outputStyle: 'expanded'
        },
        files: {
          '<%= dist %>/assets/css/app.css': 'scss/app.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          '<%= dist %>/assets/css/app.css': 'scss/app.scss'
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
    },


    // copie les fichiers
    copy: {
      dist: {
        files: [
          {
            expand: true, src: ['*.hbs'], dest: '<%= dist %>'
          },
          {
            expand: true, cwd: 'assets/', src: ['**'], dest: '<%= dist %>/assets'
          }
        ]
      }
    },

    // nettoyage des fichiers / répertoires
    clean: {
      dist: [
        '<%= dist %>/**'
      ]
    }

  });

  // plugin pour surveiller les modifications des fichiers à chaud
  grunt.loadNpmTasks('grunt-contrib-watch');
  // plugin de suppression de fichiers
  grunt.loadNpmTasks('grunt-contrib-clean');
  // plugin pour copier les fichiers
  grunt.loadNpmTasks('grunt-contrib-copy');
  // plugin de pré-processing SASS
  grunt.loadNpmTasks('grunt-sass');
  // plugin pour zipper des fichiers
  grunt.loadNpmTasks('grunt-zip');

  grunt.registerTask('build',[
    'clean:dist',
    'sass:dist',
    'copy:dist'
  ]);
  grunt.registerTask('default', ['sass:dev','watch']);
}