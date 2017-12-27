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
  playSound(buffer) {
    var source = this.context.createBufferSource() // creates a sound source
    source.buffer = buffer                    // tell the source which sound to play
    source.connect(this.context.destination)       // connect the source to the context's destination (the speakers)
    source.start(0)                           // play the source now
  }
  play(key){
    this.playSound(this.buffer[key])
  }
  
}
