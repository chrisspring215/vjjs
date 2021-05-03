// TODO: Make a place to assign CHs for knobs and sliders that control prams //
//console.clear();

let img;
function preload() {
  img = loadImage('https://cors-anywhere.herokuapp.com/http://assets.stickpng.com/images/5aafb1f57603fc558cffc0cc.png');
}


// Create Canvas //////////////////////////////////////////////////
function setup() {
  createCanvas(1920, 1080);
  noLoop()
  frameRate(60)
}



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
    //console.clear();
    console.log(message.data[1], message.data[2])
    size = random(10, 15)*map(message.data[2], 0 , 127, 1, 3)
    image(img, random(-300, window.innerWidth), random(-300, window.innerHeight), size, size-(size*.2));
      filter(THRESHOLD);
    
    
    
  }
  
}