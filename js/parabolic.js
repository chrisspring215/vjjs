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
  
  
  // Listens for MIDI signal and assigns values according to channel //
 
let x1Feq = 1;
let x1Amp = 1;
let y1Feq = 1;
let y1Amp = 1;
let x2Feq = 1;
let x2Amp = 1;
let y2Feq = 1;
let y2Amp = 1;
let lineWeight = 1;

  function onMidiMessage(message) {
    let midiCommand = message.data[0];
    let midiAddress = message.data[1];
    let midiValue = message.data[2];

    if (midiCommand === 176 && midiAddress === 28) {
      x1Feq = map(midiValue,0,127,-winWidth,winWidth);
    } else {}
    if (midiCommand === 176 && midiAddress === 32) {
      x1Amp = map(midiValue,0,127,-winWidth,winWidth);
    } else {}
    if (midiCommand === 176 && midiAddress === 36) {
      y1Feq = map(midiValue,0,127,-winHeight,winHeight);
    } else {}
    if (midiCommand === 176 && midiAddress === 40) {
      y1Amp = map(midiValue,0,127,-winHeight,winHeight);
    } else {}
    if (midiCommand === 176 && midiAddress === 44) {
      x2Feq = map(midiValue,0,127,-winWidth,winWidth);
    } else {}
    if (midiCommand === 176 && midiAddress === 48) {
      x2Amp = map(midiValue,0,127,-winWidth,winWidth);
    } else {}
    if (midiCommand === 176 && midiAddress === 52) {
      y2Feq = map(midiValue,0,127,-winHeight,winHeight);
    } else {}
    if (midiCommand === 176 && midiAddress === 56) {
      y2Amp = map(midiValue,0,127,-winHeight,winHeight);
    } else {}


    if (midiCommand === 176 && midiAddress === 25) {
      lineWeight = map(midiValue,0,127,1,100);
    } else {}
  }


let t = 1;

const lines = 60;

function draw() {
  background(0)
  stroke(255,10, random(0,120));
  strokeWeight(lineWeight);
  translate(innerWidth/2, innerHeight/2)

  for (i = 0; i < lines; i++) {
    
  
    line(x1(t),y1(t),x2(t + i + i),y2(t));

    
  } 
    //fill(0,0,0,100)
    //noStroke()
    //translate(-innerWidth/2, -innerHeight/2)
    //rect(0,0,innerWidth,innerHeight)
  t++

}

//feq * amp
let x1 = function x(t) {
  return sin(t/x1Feq) * x1Amp + sin(t / 1) * 20; 
  }

let y1 = function y(t) {
    return cos(t/y1Feq) * y1Amp + cos(t /1) + 30;
  };

let x2 = function x(t) {
  return sin(t/x2Feq) * x2Amp + sin(t) * 1; 
  }

let y2 = function y(t) {
  return cos(t/y2Feq) * y2Amp + cos(t /1) + 20; 
};

