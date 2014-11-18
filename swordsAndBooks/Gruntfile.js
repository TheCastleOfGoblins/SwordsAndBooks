//Gruntfile

module.exports = function(grunt) {
  var timestamp = grunt.template.today("yyyymmddhMMss");
  //Initializing the configuration object
  grunt.initConfig({
    // Task configuration
    copy: {
      main: {
        files: [
          {expand : true, src : 'public/**', dest : '../builds/current/'},
          {expand : true, src : 'app/models/**', dest : '../builds/current/'},
          {expand : true, src : 'app/controllers/**', dest : '../builds/current/'},
          {expand : true, src : 'app/views/**', dest : '../builds/current/'},
          {expand : true, src : 'app/models/**', dest : '../builds/current/'},
          {expand : true, src : 'package.json', filter:'isFile', dest : '../builds/current/'},
          {expand : true, src : 'config/**', dest : '../builds/current/'},
          {expand : true, src : 'servStart.sh' , dest : '../builds/current/'}
        ]
      }
    },
    compress: {
      main: {
        options: {
          archive: '../builds/website_build_'+ timestamp +'.zip'
        },
        expand: true,
        src: '../builds/current/'
      }
    },
    concat: {
        options: {
          separator: ';',
        },
        js_frontend: {
          src: [
            './bower_components/jquery/dist/jquery.js', //for now we are not building jquery on our own
            './bower_components/bootstrap/dist/js/bootstrap.js', //for now we are not building bootstrap.js on our own
            './app/assets/javascript/frontend.js'
          ],
          dest: './public/js/script_test.js'
        }
    },
    less: {
        development: {
            options: {
              compress: false,  //minifying the result
            },
            files: {
              //compiling frontend.less into frontend.css
              "./public/css/style_test.css":"./app/assets/stylesheets/frontend.less",
            }
        }
    },
    uglify: {
      options: {
        mangle: false  // Use if you want the names of your functions and variables unchanged
      },
      frontend: {
        files: {
          //'./public/assets/javascript/frontend.js': './public/assets/javascript/frontend.js',
        }
      },
    },
    imagemin: {
      png: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: '.',
            src: ['app/assets/images/**/*.png'],
            // Could also match cwd line above. i.e. project-directory/img/
            dest: 'public/img/',
            ext: '.png'
          }
        ]
      },
      jpg: {
        options: {
          progressive: true
        },
        files: [
          {
            // Set to true to enable the following options…
            expand: true,
            // cwd is 'current working directory'
            cwd: '.',
            src: ['app/assets/images/**/*.jpg'],
            // Could also match cwd. i.e. project-directory/img/
            dest: 'public/img/',
            ext: '.jpg'
          }
        ]
      }
    },
    watch: {
      js_frontend: {
        files: [
          //watched files
          './bower_components/jquery/dist/jquery.js',
          './bower_components/bootstrap/dist/js/bootstrap.js',
          './app/assets/javascript/frontend.js'
          ],   
        tasks: ['concat:js_frontend','uglify:frontend'],     //tasks to run
        options: {
          livereload: true                        //reloads the browser
        }
      },
      less: {
        files: ['./app/assets/stylesheets/*.less'],  //watched files
        tasks: ['less'],                          //tasks to run
        options: {
          livereload: true                        //reloads the browser
        }
      }
    }
  });
  
  // Plugin loading
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');
  //grunt.loadNpmTasks('grunt-contrib-clean');
  // Task definitions
  grunt.registerTask('build-prod',[
    'imagemin',
    'less',
    'concat:js_frontend',
    'uglify:frontend',
    'copy',
    'compress'
  ]);
  //by default only watch less files for changes and rebuild css
  grunt.registerTask('default', ['watch']);
};

