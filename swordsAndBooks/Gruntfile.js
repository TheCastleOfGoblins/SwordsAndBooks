//Gruntfile

module.exports = function(grunt) {

//Initializing the configuration object
  grunt.initConfig({
    // Task configuration
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
        //TODO setup production task
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

  // Task definitions
  grunt.registerTask('default', ['watch']);

};

