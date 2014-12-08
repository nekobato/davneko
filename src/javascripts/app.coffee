
window.DN = new Vue
  el: "#davneko"

  components:
    media_blank:
      template: '#dn_media_blank'
    media_music:
      template: '#dn_media_music'
    media_image:
      template: '#dn_media_image'
    media_book:
      template: '#dn_media_book'
    media_movie:
      template: '#dn_media_movie'

  data:
    dirs: []
    media:
      component: 'media_blank'
      src: ''
      show: false

  filters:
    file2icon: (file) ->
      return 'fa fa-folder-o' if file.type is 'directory'
      switch file.name.split('.').pop()
        when 'mp3', 'aac', 'ogg'
          return 'fa fa-music'
        when 'png', 'jpg', 'jpeg', 'gif'
          return 'fa fa-image'
        when 'pdf'
          return 'fa fa-book'
        else
          return 'fa fa-file-o'

  methods:
    fileOpen: (e) ->
      depth =    e.target.parentNode.getAttribute('data-depth')
      pathname = e.target.parentNode.getAttribute('data-name')
      filename = e.target.innerText
      if e.target.className is 'directory'
        @.getDir "#{pathname}/#{filename}", Number(depth)+1
      if e.target.className is 'file'
        @.getFile "#{pathname}/#{filename}", filename

    getDir: (path, newdepth) ->
      superagent.get '/api/path'
      .query { path: path }
      .end (err, res) ->
        DN.dirs.splice newdepth
        DN.dirs.push
          name: path
          depth: newdepth
          files: JSON.parse(res.text)
        Vue.nextTick () ->
          fileviewer.scrollLeft = fileviewer.scrollWidth

    getFile: (path, filename) ->
      switch filename.split('.').pop()
        when 'mp3', 'aac', 'ogg'         then component = 'media_music'
        when 'png', 'jpg', 'jpeg', 'gif' then component = 'media_image'
        when 'pdf'                       then component = 'media_book'
        when 'mp4', 'mpg', 'mpeg', 'avi' then component = 'media_movie'
        else window.open "/api/path?path=#{encodeURIComponent path}"
      @$data.media =
        component: component
        src: "/api/path?path=#{encodeURIComponent path}"
        show: true


    isFile: (filetype) ->
      return true if filetype is 'file'

    closeMedia: (e) ->
      @$data.media =
        component: 'media_blank'
        src: ''
        show: false

  ready: () ->
    # first attachment 以前の{{}}表示は見苦しいので、ここから表示
    @.$el.classList.remove('hide')
    @.getDir '.', 0
