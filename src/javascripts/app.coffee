
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
      src:       ''
      show:      false

  filters:
    file2icon: (file) ->
      return 'fa fa-folder-o' if file.type is 'directory'
      switch file.name.split('.').pop()
        when 'mp3', 'aac', 'ogg'         then return 'fa fa-music'
        when 'png', 'jpg', 'jpeg', 'gif' then return 'fa fa-image'
        when 'pdf'                       then return 'fa fa-book'
        else                                  return 'fa fa-file-o'

    isFile: (file) ->
      if file.type is 'directory'
        return false
      else
        return true

  methods:
    fileOpen: (e) ->
      depth    = e.targetVM.$parent.depth
      pathname = e.targetVM.$parent.name
      filename = e.target.innerText
      if e.targetVM.file.type is 'directory'
        @.getDir "#{pathname}/#{filename}", Number(depth)+1
      if e.targetVM.file.type is 'file'
        @.getFile "#{pathname}/#{filename}", filename

    download: (e) ->
      path = e.targetVM.name + "/" + e.targetVM.file.name
      window.open "/api/path?download=true&path=#{encodeURIComponent path}"

    getDir: (path, newdepth) ->
      superagent.get '/api/path'
      .query { path: path }
      .end (err, res) ->
        DN.dirs.splice newdepth
        DN.dirs.push
          name:  path
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
        else return window.open "/api/path?path=#{encodeURIComponent path}"
      @$data.media =
        component: component
        src:       "/api/path?path=#{encodeURIComponent path}"
        show:      true

    closeMedia: (e) ->
      @$data.media =
        component: 'media_blank'
        src:       ''
        show:      false

  ready: () ->
    # first attachment 以前の{{}}表示は見苦しいので、ここから表示
    @.$el.classList.remove('hide')
    @.getDir '.', 0
