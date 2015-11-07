request = require('superagent')

module.exports =
  template: '#davneko_audiobox'

  replace: false

  data: () ->
    player:
      file:
        name: 'no audio'
        path: null
      controls:
        repeat: 'no'

    playlist: []

  filters:

    pathToQuery: (path) ->
      return "" unless path
      return "/api/path?path=#{encodeURIComponent(path)}"

  events:
    "set-files": "onReceiveFiles"
    "audio-trigger-next": "playNextQueue"
    "nowplaying ended": "playNextQueue"

  methods:

    onReceiveFiles: (files) ->
      for file in files
        if /\.(ogg|wav|mp3|mp4|aac|m4a)$/.test file.name
          if @player.file.path is null
            @player.file = file
          else
            @playlist.push file

    playNextQueue: () ->
      return if @playlist.length is 0
      @player.file = @playlist.shift()

      setTimeout =>
        @$$.audio_player.play()
      , 200

    onTriggerNext: () ->
      @$emit 'audio-trigger-next'

    deleteItem: (index) ->
      @$data.playlist.splice(index, 1)

    clearPlaylist: ->
      @$data.playlist = []

    onDragQueueStart: () ->
      console.log 'dragstart'
    onDragQueueEnd: (el) ->
      console.log el

  ready: () ->

    @$$.audio_player.addEventListener 'ended', () =>
      console.log 'player ended'
      @$emit 'nowplaying ended'
