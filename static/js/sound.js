var context
var bufferList = []

window.addEventListener('load', init, false)

function init() {
  try {
    window.AudioContext = window.AudioContext||window.webkitAudioContext
    context = new AudioContext()
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser')
    return
  }
  load()
}

function load(){
  try {
    // 非同期でロードされるため明示的に格納インデックスを指定してロードする
    loadSound(0, './static/sound/base.mp3')
    loadSound(1, './static/sound/se_maoudamashii_onepoint22.mp3')
  }
  catch(e) {
    console.error(e)
  }
}

function loadSound(index, url) {
  var request = new XMLHttpRequest()
  request.open('GET', url, true)
  request.responseType = 'arraybuffer'

  // Decode asynchronously
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      bufferList[index] = buffer
    }, (err) => {
      console.error(e)
    })
  }
  request.send()
}

function playSound(buffer) {
  var source = context.createBufferSource() // creates a sound source
  source.buffer = buffer                    // tell the source which sound to play
  source.connect(context.destination)       // connect the source to the context's destination (the speakers)
  source.start(0)                           // play the source now
}

document.addEventListener('keydown', keyDown)

function play1() {
  playSound(bufferList[0])
}  
function play2() {
  playSound(bufferList[1])
}  

function keyDown(e) {
  if(e.key === 'a') play1()
  if(e.key === 's') play2()
}

document.getElementById('btn1').addEventListener('touchstart', function(ev) {
  play1()
}, false)

document.getElementById('btn2').addEventListener('touchstart', function(ev) {
  play2()
}, false)

