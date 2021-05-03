let winWidth = window.innerWidth;
let winHeight = window.innerHeight;


// Assign MIDI Channels //
const ctl = [
  [25,26,27,1,3,28],
  [29,30,31,4,6,32],
  [33,34,35,7,9,36],
  [37,38,39,10,12,40],
  [41,42,43,13,15,44],
  [45,46,47,16,18,48],
  [49,50,51,19,21,52],
  [53,54,55,22,24,56],
  [62]
];

// Create Canvas //
function setup() {
  createCanvas(winWidth, winHeight, WEBGL);
  frameRate(60)

}

  // When a MIDI signal is received, this fires the function that build the shape //
  navigator.requestMIDIAccess().then(access => {
    const devices = access.inputs.values();
    for (let device of devices)
      device.onmidimessage = onMidiMessage;
  }).catch(console.error);
  
  
  // Listens for MIDI signal and assigns values according to channel //
  
  let red = 50;
  let green = 50;
  let blue = 50;
  
 
  let shape = {
    rect: function() {rect(0,0,200,100);},
    ellipse: function() {ellipse(0,0,100,100);}
  };

  let color = {
    storeColor:
    function(x) {
      c = floor(map(x, 0, 127 , 0, 255));
      return c
    }
  }

  function onMidiMessage(message) {

    background(255)

    let midiCommand = message.data[0];
    let midiAddress = message.data[1];
    let midiValue = message.data[2];


    if (midiCommand === 144 && midiAddress === 1 && midiValue === 127 && midiValue !== 0) {
      x = shape.rect()
    } else {}

    if (midiCommand === 144 && midiAddress === 4 && midiValue === 127 && midiValue !== 0) {
      x = shape.ellipse()
    } else {}

    if (midiCommand === 176 && midiAddress === 25) {
      c = color.storeColor(midiValue);
      red = c;
    } else {}

    if (midiCommand === 176 && midiAddress === 26) {
      c = color.storeColor(midiValue);
      green = c;
    } else {}

    if (midiCommand === 176 && midiAddress === 27) {
      c = color.storeColor(midiValue);
      blue = c;
    } else {}

    console.log(red,green,blue)
  }

  function draw() {
    fill(red,green,blue)
  }
