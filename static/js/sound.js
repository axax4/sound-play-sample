const audio = new Audio()
const vol = document.getElementById('vol')
const volLabel = document.getElementById('vol-lbl')

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
vol.addEventListener('change', ()=> {
  volLabel.textContent = vol.value
})
vol.addEventListener('mousemove', ()=> {
  volLabel.textContent = vol.value
})


function play1() {
  audio.play({key:'base', volume:vol.value})
}  
function play2() {
  audio.play({key:'pirori', volume:vol.value})
}  
const keymap = {'a':play1, 's':play2}
function keyDown(e) {
  let f = keymap[e.key]
  if (f) f()
}

document.getElementById('btn1').addEventListener('touchstart', play1)
document.getElementById('btn2').addEventListener('touchstart', play2)

