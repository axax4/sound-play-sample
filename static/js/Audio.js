function basename(path){
  return path.split('/').pop().split('.')[0]
}

class Audio {
  constructor(){
    this.context = null
    this.buffer = {}
  }
  init(){
    window.AudioContext = window.AudioContext||window.webkitAudioContext
    this.context = new AudioContext()
  }
  loadSound({key, url}) {
    var request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    const context = this.context
    const buffer = this.buffer
  
    // Decode asynchronously
    request.onload = function() {
      context.decodeAudioData(request.response, function(buf) {
        var _key = key || basename(url)
        buffer[_key] = buf
      }, (err) => {
        console.error(e)
      })
    }
    request.send()
  }
  playSound({buffer, volume}) {
    var source = this.context.createBufferSource()
    source.buffer = buffer
    source.connect(this.context.destination)

    // volume
    var gainNode = this.context.createGain()
    source.connect(gainNode)
    gainNode.connect(this.context.destination)
    gainNode.gain.value = volume || 0

    // 再生終了イベント
    // source.onended = function() {}

    source.start(0)
  }
  play({key, volume}){
    this.playSound({buffer:this.buffer[key], volume})
  }
  
}
