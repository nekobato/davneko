request = require('superagent')
_ = require('lodash')

root_dir = [{
  name: 'Music'
  type: 'component'
  icon: 'mdi-av-my-library-music'
  component_name: 'filer_music'
}, {
  name: 'Book'
  type: 'component'
  icon: 'mdi-av-my-library-books'
  component_name: 'filer_book'
}]

module.exports =

  template: '#davneko_nav'

  data: () ->
    current_dir: root_dir
    current_dir_type: 'root'

  methods:

    onSelectItem: (file) ->
      @$dispatch 'filer-select-item', [file]

    onSelectItemIcon: (e) ->
      e.preventDefault()
      console.log 'icon selected'

    fileOpen: (e) ->
      depth    = e.targetVM.$parent.depth
      pathname = e.targetVM.$parent.name
      filename = e.target.innerText || e.target.textContent
      if e.targetVM.file.type is 'directory'
        @getDir "#{pathname}/#{filename}", depth
        @depths[depth] = filename
      if e.targetVM.file.type is 'file'
        @getFile "#{pathname}/#{filename}", filename

    getDir: (path, depth) ->
        superagent.get '/api/path'
        .query { path: path }
        .end (err, res) ->
          DN.dirs.splice depth
          DN.dirs.push
            name:  path
            depth: depth + 1
            files: JSON.parse(res.text)
          Vue.nextTick () ->
            fileviewer.scrollLeft = fileviewer.scrollWidth

    getFile: (path, filename) ->
      switch filename.split('.').pop()
        when 'mp3', 'aac', 'ogg'         then component = 'media_music'
        when 'png', 'jpg', 'jpeg', 'gif' then component = 'media_image'
        when 'pdf'                       then component = 'media_book'
        when 'mp4', 'mpg', 'mpeg', 'avi' then component = 'media_movie'
        else return window.open "/api/path?path=#{encodeURIComponent path}"
      @$data.media =
        component: component
        src:       "/api/path?path=#{encodeURIComponent path}"
        show:      true

  ready: () ->
