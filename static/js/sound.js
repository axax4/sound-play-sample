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
  audio.loadSound({url: './static/base.mp3'})
  audio.loadSound({key:'pirori', url: './static/se_maoudamashii_onepoint22.mp3'})
}

document.addEventListener('keydown', keyDown)

function play1() {
  audio.play('base')
}  
function play2() {
  audio.play('pirori')
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

