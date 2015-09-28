request = require('superagent')

module.exports =
  template: '#davneko_audiobox'

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
      return "/api/path?path=#{encodeURIComponent(path)}";

  methods:

    onReceiveFile: (file) ->

      console.log 'onReceiveFile', file

      if /\.(ogg|wav|mp3|aac|m4a)$/.test file.name
        @$emit 'audio-add-audio', file

    addAudioToPlaylist: (file) ->
      console.log 'AddAudioToPlaylist'

      if @player.file.path is null
        @player.file = file
      else
        @playlist.push file

    playNextQueue: () ->
      console.log 'play next queue'
      return if @playlist.length is 0

      @player.file = @playlist.shift()

      setTimeout () ->
        document.querySelector('#audio_player').play()
      , 200

    onTriggerNext: () ->
      @$emit 'audio-trigger-next'


  ready: () ->
    @$on 'set-file', @onReceiveFile
    @$on 'audio-add-audio', @addAudioToPlaylist
    @$on 'audio-trigger-next', @playNextQueue
    @$on 'nowplaying ended', @playNextQueue

    audio_el = document.querySelector '#audio_player'

    audio_el.addEventListener 'ended', () =>
      console.log 'player ended'
      @$emit 'nowplaying ended'
