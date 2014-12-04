(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
Vue.filter('filetype2icon', function(file) {
  if (file.type === 'directory') {
    return 'fa fa-folder-o';
  }
  switch (file.name.split('.').pop()) {
    case 'mp3':
    case 'aac':
    case 'ogg':
      return 'fa fa-music';
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return 'fa fa-image';
    case 'pdf':
      return 'fa fa-book';
    default:
      return 'fa fa-file-o';
  }
});

window.DN = new Vue({
  el: "#davneko",
  data: {
    dirs: []
  },
  methods: {
    fileOpen: function(e) {
      var depth, filename, pathname;
      depth = e.target.parentNode.getAttribute('data-depth');
      pathname = e.target.parentNode.getAttribute('data-name');
      filename = e.target.innerText;
      if (e.target.className === 'directory') {
        this.getDir("" + pathname + "/" + filename, Number(depth) + 1);
      }
      if (e.target.className === 'file') {
        return this.getFile("" + pathname + "/" + filename);
      }
    },
    getDir: function(path, newdepth) {
      return superagent.get('/api/path').query({
        path: path
      }).end(function(err, res) {
        DN.dirs.splice(newdepth);
        return DN.dirs.push({
          name: path,
          depth: newdepth,
          files: JSON.parse(res.text)
        });
      });
    },
    getFile: function(path) {
      return window.open("/api/path?path=" + (encodeURIComponent(path)));
    },
    isFile: function(filetype) {
      if (filetype === 'file') {
        return true;
      }
    }
  },
  ready: function() {
    this.$el.classList.remove('hide');
    return this.getDir('.', 0);
  }
});



},{}]},{},[1]);
