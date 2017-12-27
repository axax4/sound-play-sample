const audio = new Audio()

window.addEventListener('load', init, false)

function init() {
  try {
    audio.init()
  }
  catch(e) {
    alert('Web Audio API is not supported in this browser')
    return
  }
  audio.loadSound({url: './static/sound/base.mp3'})
  audio.loadSound({key:'pirori', url: './static/sound/se_maoudamashii_onepoint22.mp3'})
}

document.addEventListener('keydown', keyDown)

function play1() {
  audio.play('base')
}  
function play2() {
  audio.play('pirori')
}  
const keymap = {'a':play1, 's':play2}
function keyDown(e) {
  keymap[e.key]()
}

document.getElementById('btn1').addEventListener('touchstart', play1)
document.getElementById('btn2').addEventListener('touchstart', play2)

