const { spawnSync } = require('child_process')

module.exports = {
  getAudioDuration (filename) {
    const shellObject = spawnSync('ffprobe', [
      '-v', 'error',
      '-of', 'flat=s=_',
      '-select_streams', 'a:0',
      '-show_streams',
      filename
    ])

    if (shellObject.stdout) {
      var stdout = shellObject.stdout.toString('utf8')
      var duration = /duration=\"(\d*\.\d*)\"/.exec(stdout)
      if (!duration) return 0
      return parseFloat(duration[1])
    } else {
      return 0
    }
  }
}
