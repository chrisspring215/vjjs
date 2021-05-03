// TODO: Make a place to assign CHs for knobs and sliders that control prams //
console.clear();


// Assign MIDI Channels //////////////////////////////////////////////////
var channels = {
  // colors //
  redCh: 19,
    redChMin: 0,
    redChMax: 255,
  greenCh: 23,
    greenChMin: 0,
    greenChMax: 255,
  blueCh: 27,
    blueChMin: 0,
    blueChMax: 255,
  alphaCh: 53,
    alphaChMin: 0,
    alphaChMax: 1,

  // Size //
  heightCh: 31,
    heightChMin: 0,
    heightChMax: 500,
  widthCh: 49,
    widthChMin: 0,
    widthChMax: 500,

  // Stroke //
  weightCh: 18,
    weightChMin:0,
    weightChMax: 200,
  strokeColorChR:22,
  strokeColorChG:26,
  strokeColorChB:30,
  strokeColorChA:48,
};


// Create Canvas //////////////////////////////////////////////////
function setup() {
  createCanvas(1920, 1080);
  noLoop()
  frameRate(60)
}


// Initalize Varibles //////////////////////////////////////////////////
// COLORS //
var colors = [0,0,0,1];
var r = colors[0]
var g = colors[1]
var b = colors[2]
var a = colors[3]
var colors = [255,255,255,1];

// SIZE //
var size = [0, 0];
var height = 0;
var width = 0;

// STROKE //
var strokeWeight = [0]
var strokeColor = [0,0,0,0]


// Draws Objects ///////////////////////////////////////////////////////////////////
function draw() {
  background(0,0,0)

  // When a MIDI signal is received, this fires the function that build the shape //
  navigator.requestMIDIAccess().then(access => {
    const devices = access.inputs.values();
    for (let device of devices)
      device.onmidimessage = onMidiMessage;
  }).catch(console.error);

  // Listens for MIDI signal and assigns values according to channel ///////////////////
  function onMidiMessage(message) {
    console.clear();

    // Color Attbs ////////////////////////////////////////////////////////////////////////////////
    // Red //
    if (message.data[1] === channels.redCh) {
      colors[0] = map(message.data[2],0,127,0,255);
    }

    // Green //
    else if (message.data[1] === channels.greenCh) {
      colors[1] = map(message.data[2],0,127,0,255);
    }

    // Blue //
    else if (message.data[1] === channels.blueCh) {
      colors[2] = map(message.data[2],0,127,0,255);
    }

    // Alpha //
    else if (message.data[1] === channels.alphaCh) {
      colors[3] = map(message.data[2],0,127,0,255);
    }

    // TODO: Add a randomizer knob //
    var r = colors[0] // *random(0, 2)
    var g = colors[1] // *random(0, 2)
    var b = colors[2] //*random(0, 2)
    var a = colors[3] //*random(0, 2)
    var c = color(r,g,b,a)
    

    // Size Attb ////////////////////////////////////////////////////////////////////////////////////////
    // Height //
    if (message.data[1] === channels.heightCh) {
      size[0] = map(message.data[2],0,127,0,255);
    }

    // Width //
    else if (message.data[1] === channels.widthCh) {
      size[1] = map(message.data[2],0,127,0,255); 
    }

    var height = size[0]
    var width = size[1]


    // Stroke Attbs //////////////////////////////////////////////////////////////////////////////////////////
    // Weight //
    if (message.data[1] === channels.weightCh) {
      strokeWeight[0] = map(message.data[2],0,127,channels.weightChMin,channels.weightChMax);
    }

    var weight = strokeWeight[0]/2

    if (message.data[1] === channels.strokeColorChR) {
      strokeColor[0] = map(message.data[2],0,127,0,255);
    }
    if (message.data[1] === channels.strokeColorChG) {
      strokeColor[1] = map(message.data[2],0,127,0,255);
    }
    if (message.data[1] === channels.strokeColorChB) {
      strokeColor[2] = map(message.data[2],0,127,0,255);
    }
    if (message.data[1] === channels.strokeColorChA) {
      strokeColor[3] = map(message.data[2],0,127,0,1);
    }



    // Shape builder /////////////////////////////////////////////////////////////////////////////////////
    fill(c)
    stroke(strokeColor[0],strokeColor[1],strokeColor[2]);
    strokeWeight(weight);
    // TODO: Create lesson the randomness of the placement // 
    ellipse(random(200, 1500), random(200, 500), height, width);

    
  }
}