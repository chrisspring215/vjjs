let winWidth = window.innerWidth;
let winHeight = window.innerHeight;


// Create Canvas //
function setup() {
  createCanvas(winWidth, winHeight);
  frameRate(60)
  background(0)
}

// When a MIDI signal is received, this fires the function that build the shape //
navigator.requestMIDIAccess().then(access => {
  const devices = access.inputs.values();
  for (let device of devices)
    device.onmidimessage = onMidiMessage;
}).catch(console.error);


let bars;
var size;
// Listens for MIDI signal and assigns values according to channel //
function onMidiMessage(message) {
  let midiCommand = message.data[0];
  let midiAddress = message.data[1];
  let midiValue = message.data[2];
  var barWidth = winWidth / bars
  


  if (midiCommand === 176 && midiAddress === 28) {
    bars = floor(map(midiValue, 0,127,4,30))
    size = floor(map(midiValue, 0,127,100,1200))

    let fillColor = 0;

    for (let index = 0; index < bars; index++) {
      noStroke()

      if(index % 2 == 0) {
        fillColor = random(0,255), random(0,255),random(0,255),random(0,255);
        }

      else {
        fillColor = fillColor - 255;
        }

      fill(random(0,255), random(0,20),random(0,40),random(0,255))
      rect(barWidth*index,0,barWidth,winHeight)

    }

  } else {}
}

function draw() {
  stroke(random(0,255),random(0,255),random(0,255),random(0,255))
  strokeWeight(60)
  ellipse(winWidth/2,winHeight/2,size,size)

  lineVert = random(0,winWidth)
  lineHoz = random(0,winHeight)
  stroke(1)
  strokeWeight(random(1,5))
  line(lineVert,random(0,lineHoz), lineVert,random(0,lineHoz))
}



  
  




