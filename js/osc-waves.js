// TODO: Make a place to assign CHs for knobs and sliders that control prams //



// Assign MIDI Channels //////////////////////////////////////////////////

// Create Canvas //////////////////////////////////////////////////
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noLoop()
  frameRate(30)
}

  // When a MIDI signal is received, this fires the function that build the shape //
  navigator.requestMIDIAccess().then(access => {
    const devices = access.inputs.values();
    for (let device of devices)
      device.onmidimessage = onMidiMessage;
  }).catch(console.error);
  
  var x
  var y 
  var h
  var w
  var r
  var g
  var b

  // Listens for MIDI signal and assigns values according to channel ///////////////////
  function onMidiMessage(message) {
    background(0,0,0,100)


    if (message.data[1] === 19) {
      x = parseFloat(map(message.data[2], 0, 127, 0, window.innerWidth))
      r = parseFloat(map(message.data[2], 0, 127, 0, 255))
    }

    if (message.data[1] === 23) {
      y= parseFloat(map(message.data[2], 0, 127, 0, window.innerHeight))
      g = parseFloat(map(message.data[2], 0, 127, 0, 60))
    }

    if (message.data[1] === 27) {
      h= parseFloat(map(message.data[2], 0, 127, 0, 600))
      b = parseFloat(map(message.data[2], 0, 127, 0, 60))
    }

    if (message.data[1] === 31) {
      w= parseFloat(map(message.data[2], 0, 127, 0, 600))
    }

    if (message.data[1] === 49) {
      background(0,0,0)
    }

    
    drawEllipse(x, y, h, w)
    function drawEllipse(x,y,h,w) {
      //filter(BLUR, 1);
      //noStroke()
      stroke(0, 0, 0, 200)
      strokeWeight(1)
      fill(r,g,b,200)
      ellipse(x,y,h,w)
      console.log(x,y,h,w)
    }
  }

// Draws Objects ///////////////////////////////////////////////////////////////////
function draw() {
  
}