(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.DN = new Vue({
  el: "#davneko",
  components: {
    media_blank: {
      template: '#dn_media_blank'
    },
    media_music: {
      template: '#dn_media_music'
    },
    media_image: {
      template: '#dn_media_image'
    },
    media_book: {
      template: '#dn_media_book'
    },
    media_movie: {
      template: '#dn_media_movie'
    }
  },
  data: {
    dirs: [],
    media: {
      component: 'media_blank',
      src: '',
      show: false
    }
  },
  filters: {
    file2icon: function(file) {
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
    },
    isFile: function(file) {
      if (file.type === 'directory') {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    fileOpen: function(e) {
      var depth, filename, pathname;
      depth = e.targetVM.$parent.depth;
      pathname = e.targetVM.$parent.name;
      filename = e.target.innerText;
      if (e.targetVM.file.type === 'directory') {
        this.getDir("" + pathname + "/" + filename, Number(depth) + 1);
      }
      if (e.targetVM.file.type === 'file') {
        return this.getFile("" + pathname + "/" + filename, filename);
      }
    },
    download: function(e) {
      var path;
      path = e.targetVM.name + "/" + e.targetVM.file.name;
      return window.open("/api/path?download=true&path=" + (encodeURIComponent(path)));
    },
    getDir: function(path, newdepth) {
      return superagent.get('/api/path').query({
        path: path
      }).end(function(err, res) {
        DN.dirs.splice(newdepth);
        DN.dirs.push({
          name: path,
          depth: newdepth,
          files: JSON.parse(res.text)
        });
        return Vue.nextTick(function() {
          return fileviewer.scrollLeft = fileviewer.scrollWidth;
        });
      });
    },
    getFile: function(path, filename) {
      var component;
      switch (filename.split('.').pop()) {
        case 'mp3':
        case 'aac':
        case 'ogg':
          component = 'media_music';
          break;
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
          component = 'media_image';
          break;
        case 'pdf':
          component = 'media_book';
          break;
        case 'mp4':
        case 'mpg':
        case 'mpeg':
        case 'avi':
          component = 'media_movie';
          break;
        default:
          return window.open("/api/path?path=" + (encodeURIComponent(path)));
      }
      return this.$data.media = {
        component: component,
        src: "/api/path?path=" + (encodeURIComponent(path)),
        show: true
      };
    },
    closeMedia: function(e) {
      return this.$data.media = {
        component: 'media_blank',
        src: '',
        show: false
      };
    }
  },
  ready: function() {
    this.$el.classList.remove('hide');
    return this.getDir('.', 0);
  }
});



},{}]},{},[1]);
