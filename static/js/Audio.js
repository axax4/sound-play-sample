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
  playSound({buffer, volume, pan}) {
    var source = this.context.createBufferSource()
    source.buffer = buffer

    // pan
    var panNode = this.context.createStereoPanner();
    panNode.pan.value = pan || 0 // left:-1 right:1
    source.connect(panNode)
    
    // volume
    var gainNode = this.context.createGain()
    panNode.connect(gainNode)
    gainNode.connect(this.context.destination)
    gainNode.gain.value = volume || 0

    // 再生終了イベント
    // source.onended = function() {}

    source.start(0)
  }
  play({key, volume, pan}){
    this.playSound({buffer:this.buffer[key], volume, pan})
  }
  
}
