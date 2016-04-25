request = require('superagent')

module.exports =
  template: '#davneko_audiobox'
  data: () ->
    player:
      file:
        name: 'no audio'
        path: null
      control:
        playing: false
        loop: false
        currentTime: 0
        currentSeekParcent: 0
    playlist: []
    reaction:
      addfile: false

  filters:

    currentTimeToSeekParcent: (time) ->

    pathToQuery: (path) ->
      return false unless path
      return "/api/path?path=#{encodeURIComponent(path)}"

  events:
    "set-files": "onReceiveFiles"
    "audio-trigger-next": "playNextQueue"
    "nowplaying ended": "playNextQueue"
    "file added": "reactionAddFile"

  methods:

    onReceiveFiles: (files) ->
      valid = false # anything valid?
      for file in files
        if /\.(ogg|wav|mp3|mp4|aac|m4a)$/.test file.name
          valid = true
          if @player.file.path is null
            @player.file = file
          else
            @playlist.push JSON.parse(JSON.stringify(file))
      @$emit 'file added' if valid

    playNextQueue: () ->
      return if @playlist.length is 0
      @player.file = @playlist.shift()

      setTimeout =>
        @$els.audio_player.play()
      , 200

    onTriggerNext: () ->
      @$emit 'audio-trigger-next'

    deleteItem: (index) ->
      @$data.playlist.splice(index, 1)

    clearPlaylist: ->
      @$data.playlist = []

    toggleLoop: ->
      @$data.player.control.loop = if @$data.player.control.loop then false else true

    reactionAddFile: ->
      @$data.reaction.addfile = true
      setTimeout =>
        @$data.reaction.addfile = false
      , 500

    onAudioPlay: ->
      @player.control.playing = true

    onAudioPause: ->
      @player.control.playing = false

    onAudioStop: ->
      @player.control.playing = false

    togglePlayPause: ->
      if @player.control.playing
        @$els.audio_player.pause()
      else
        @$els.audio_player.play()

    updateAudioTime: ->
      @$data.player.control.currentTime = @$els.audio_player.currentTime
      @$data.player.control.currentSeekParcent = @$els.audio_player.currentTime / @$els.audio_player.duration * 100

    onClickSeekbar: (e) ->
      if @$els.audio_player.src
        @$els.audio_player.currentTime = @$els.audio_player.duration * ( e.offsetX / @$els.seekbar.offsetWidth )
        @updateAudioTime()

  ready: () ->

    player = @$els.audio_player

    player.addEventListener 'ended', () =>
      console.log 'player ended'
      @$emit 'nowplaying ended'
