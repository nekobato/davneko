window.DN = new Vue
  el: "#davneko"

  data:
    dirs: []

  methods:
    fileOpen: (e) ->
      depth =    e.target.parentNode.getAttribute('data-depth')
      pathname = e.target.parentNode.getAttribute('data-name')
      filename = e.target.innerText
      if e.target.className is 'directory'
        @.getDir "#{pathname}/#{filename}", Number(depth)+1
      if e.target.className is 'file'
        @.getFile "#{pathname}/#{filename}"

    getDir: (path, newdepth) ->
      superagent.get '/api/path'
      .query { path: path }
      .end (err, res) ->
        DN.dirs.splice newdepth
        DN.dirs.push
          name: path
          depth: newdepth
          files: JSON.parse(res.text)

    getFile: (path) ->
      window.open "/api/path?path=#{encodeURIComponent path}"


  ready: () ->
    # first attachment 以前の{{}}表示は見苦しいので、ここから表示
    @.$el.classList.remove('hide')

    @.getDir '.', 0
