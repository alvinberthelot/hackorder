module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cfg: grunt.file.readJSON('credentials/hackorder/_config.json'),
    // cfg: grunt.file.readJSON('config.json'),
    dist: 'dist',
    production: '../ghost/content/themes',

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
          '<%= dist %>/<%= pkg.name %>/assets/css/app.css': 'scss/app.scss'
        }
      },
      dist: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          '<%= dist %>/<%= pkg.name %>/assets/css/app.css': 'scss/app.scss'
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
        files: '**/*.hbs',
        tasks: ['copy:dist']
      },
    },

    // plugin pour copier les fichiers
    copy: {
      dist: {
        files: [
          {
            expand: true,
            src: ['*.hbs', 'partials/**', 'package.json'],
            dest: '<%= dist %>/<%= pkg.name %>'
          },
          {
            expand: true,
            cwd: 'meta/',
            src: ['*.txt'],
            dest: '<%= dist %>/<%= pkg.name %>'
          },          
          {
            expand: true,
            cwd: 'assets/',
            src: ['components/**', 'fonts/**', 'img/**', 'js/**'],
            dest: '<%= dist %>/<%= pkg.name %>/assets'
          }
        ]
      }
      ,
      production: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: '<%= production %>'
          }
        ]
      }
    },

    // plugin pour remplacer des chaînes de caractères dans les ficheirs
    'string-replace': {
      google_analytics: {
        files: {
          '<%= dist %>/<%= pkg.name %>/default.hbs' : '<%= dist %>/<%= pkg.name %>/default.hbs'
        },
        options: {
          replacements: [{
            pattern: 'UA-XXXXX-X',
            replacement: '<%= cfg.UA %>'
          }]
        }
      },
      disqus: {
        files: {
          '<%= dist %>/<%= pkg.name %>/partials/disqus.hbs' : '<%= dist %>/<%= pkg.name %>/partials/disqus.hbs'
        },
        options: {
          replacements: [{
            pattern: 'disqus-XXX',
            replacement: '<%= cfg.disqus %>'
          }]
        }
      }
    },

    // plugin de suppression de fichiers
    clean: {
      dist: [
        '<%= dist %>/**'
      ]
    },

    // plugin pour zipper des fichiers
    zip: {
      dist: {
        cwd: '<%= dist %>/<%= pkg.name %>',
        src: ['<%= dist %>/<%= pkg.name %>/**'],
        dest: '<%= dist %>/<%= pkg.name %>_<%= pkg.version %>.zip'
      }
    }

  });
  
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-zip');
  grunt.loadNpmTasks('grunt-string-replace');

  grunt.registerTask('build',[
    'clean:dist',
    'sass:dist',
    'copy:dist'
  ]);

  grunt.registerTask('production',[
    'clean:dist',
    'sass:dist',
    'copy:dist',
    'string-replace:google_analytics',
    'string-replace:disqus',
    'copy:production'
    // 'zip:dist'
  ]);

  grunt.registerTask('default', ['sass:dev','watch']);
}