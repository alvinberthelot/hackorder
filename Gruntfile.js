module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cfg: grunt.file.readJSON('config.json'),
    dist: 'dist',

    // plugin de pré-processing SASS
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

    // plugin pour surveiller les modifications des fichiers à chaud
    watch: {
      grunt: {
        files: ['Gruntfile.js']
      },
      sass: {
        files: 'scss/**/*.scss',
        tasks: ['sass:dev']
      },
      hbs: {
        files: '*.hbs',
        tasks: ['copy:dist']
      },
    },

    // plugin pour copier les fichiers
    copy: {
      dist: {
        files: [
          {
            expand: true, src: ['*.hbs'], dest: '<%= dist %>'
          },
          {
            expand: true, cwd: 'assets/', src: ['components/**', 'fonts/**', 'img/**', 'js/**'], dest: '<%= dist %>/assets'
          }
        ]
      }
    },

    // plugin pour remplacer des chaînes de caractères dans les ficheirs
    'string-replace': {
      google_analytics: {
        files: {
          'dist/default.hbs' : 'dist/default.hbs'
        },
        options: {
          replacements: [{
            pattern: 'UA-XXXXX-X',
            replacement: '<%= cfg.UA %>'
          }]
        }
      }
    },

    // plugin de suppression de fichiers
    clean: {
      dist: [
        '<%= dist %>/**'
      ]
    }

  });

  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  // plugin pour zipper des fichiers
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('build',[
    'clean:dist',
    'sass:dev',
    'copy:dist'
  ]);

  grunt.registerTask('production',[
    'clean:dist',
    'sass:dist',
    'copy:dist',
    'string-replace:google_analytics'
  ]);

  grunt.registerTask('default', ['sass:dev','watch']);
}