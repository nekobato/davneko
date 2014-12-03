app = require('express')()
server = require('http').Server(app)
redis = require("redis").createClient()

io = require('socket.io')(server)

# user (hash)
# user $socket.id {room:"", peerid:"", nick:""}
# key  hashkey    stringifyed-json

# room (list)
# room:$room_name [id1, id2, id3, ...]
# key             socket.id

io.on 'connection', (socket) ->

  socket.room = {} if !socket.room
  socket.peer = {} if !socket.peer

  socket.on 'enter', (data) ->

    console.log data

    socket.peer.id = (Math.random().toString(36) + '0000000000000000000').substr(2, 16)
    socket.emit 'entered', socket.peer

    socket.room.name = data.room
    socket.join socket.room.name
    socket.to(socket.room.name).emit 'user entered', socket.peer
    #redis.hmset socket.peer.id, "peerid", socket.peer.id


  socket.on 'join', (data) ->
    socket.room.name = data.room

    socket.join socket.room.name
    socket.to(socket.room.name).emit 'joined', socket.peer

    #redis.hmset socket.peer.id, "peerid", socket.peer.id

  socket.on 'disconnect', () ->
    socket.leave(socket.room.name) if socket.room.name
    #redis.del socket.peer.id if socket.peer.id

    socket.to(socket.room.name).emit 'user leaved', socket.peer.id if socket.peer.id

module.exports = io
