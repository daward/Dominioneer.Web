module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      react: {
        files: 'ui/*',
        tasks: ['browserify']
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          ignore: ['node_modules/**', 'Gruntfile.js'],
          ext: 'js,yml',
          nodeArgs: ['--debug']
        }
      }
    },
    concurrent: {
      dev: ['nodemon'],
      options: {
        logConcurrentOutput: true
      }
    },
    browserify: {
      options: {
        transform: [require('grunt-react').browserify]
      },
      client: {
        src: ['ui/*'],
        dest: 'assets/bundle.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks("grunt-concurrent");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.registerTask('develop', ['concurrent']);
  grunt.registerTask('default', ['browserify']);
};