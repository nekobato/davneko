module.exports = (grunt) ->
  grunt.initConfig

    pkg: grunt.file.readJSON 'package.json'

    coffeelint:
      options:
        max_line_length:
          value: 200
        indentation:
          value: 2
        newlines_after_classes:
          level: 'error'
        no_empty_param_list:
          level: 'error'
        no_unnecessary_fat_arrows:
          level: 'ignore'
      dist:
        files: [
          { expand: yes, cwd: './', src: [ '*.coffee' ] }
        ]

    simplemocha:
      options:
        ui: 'bdd'
        reporter: 'spec'
        compilers: 'coffee:coffee-script'
        ignoreLeaks: no
      dist:
        src: [ 'test/**/*.coffee' ]

    browserify:
      dist:
        src: ['src/javascripts/**/*.coffee']
        dest: 'public/javascripts/app.js'
        options:
          transform: ['coffeeify']
          browserifyOptions: {
            extensions: ['.coffee']
          }

    sass:
      dist:
        expand: true
        cwd: 'src/stylesheets'
        src: ['*.{scss,sass}']
        dest: 'public/stylesheets'
        ext: '.css'

    autoprefixer:
      options:
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
        silent: true
      dist:
        expand: true
        flatten: true
        src: 'public/stylesheets/**/**.css'
        dest: 'public/stylesheets/'

    watch:
      options:
        dateFormat: (time) ->
          grunt.log.writeln "The watch finished in #{time}ms"
      #check:
      #  files: ['**/*.coffee']
      #  tasks: ['coffeelint', 'simplemocha']
      stylesheets:
        files: ['src/stylesheets/**/*.{scss,sass}']
        tasks: ['sass', 'autoprefixer']
      javascripts:
        files: ['src/javascripts/**/*.coffee']
        tasks: ['browserify']

  # test, lint
  grunt.loadNpmTasks 'grunt-coffeelint'
  grunt.loadNpmTasks 'grunt-simple-mocha'
  # compile
  #grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks  'grunt-browserify'
  grunt.loadNpmTasks  'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-autoprefixer'
  grunt.loadNpmTasks 'grunt-notify'
  # watch
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'build', ['sass', 'autoprefixer', 'browserify']
  grunt.registerTask 'test', ['coffeelint', 'simplemocha']
  grunt.registerTask 'default', ['build', 'watch']
