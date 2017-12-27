console.log('*sound.js')

var context;
var dogBarkingBuffer = null;
var bufferList = [];

window.addEventListener('load', init, false);

function init() {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();

console.log('*init AudioContext OK')

  }
  catch(e) {
    alert('Web Audio API is not supported in this browser');
  }

  decode()
}

function loadSound(url, cb) {
console.log('*loadSound')

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.responseType = 'arraybuffer';

  // Decode asynchronously
  request.onload = function() {
    // cb(request.response)
    context.decodeAudioData(request.response, function(buffer) {
      // dogBarkingBuffer = buffer;
      bufferList[bufferList.length] = buffer;
    }, (err) => {
      console.error(e);
    });

  }
  request.send();
}


function decode(){
console.log('*decode')
  try {
    loadSound('./static/base.mp3')
    loadSound('./static/se_maoudamashii_onepoint22.mp3')
  }
  catch(e) {
    console.error(e)
  }
}

function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.start(0);                           // play the source now
}

function play1() {
  playSound(bufferList[0])
}  
function play2() {
  playSound(bufferList[1])
}  


document.addEventListener('keydown', keyDown);

function keyDown(e) {
  console.log('keydown', e.key)

  if(e.key === 'a') {
    play1()
  }
  if(e.key === 's') {
    play2()
  }
}