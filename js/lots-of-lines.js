// TODO: Make a place to assign CHs for knobs and sliders that control prams //
console.clear();


// Assign MIDI Channels //////////////////////////////////////////////////

// Create Canvas //////////////////////////////////////////////////
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  noLoop()
  frameRate(60)
  rectMode(CENTER);
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
    console.clear();
    console.log("words")
    
    var size = [0,0,0,0]

    if (message.data[1] === 19) {
      size[0] = map(message.data[2],0,127,0,4);
    }

    if (message.data[1] === 23) {
      size[1] = map(message.data[2],0,127,0,4);
    }

    if (message.data[1] === 27) {
      size[2] = map(message.data[2],0,127,0,200);
    }

    if (message.data[1] === 31) {
      size[3] = map(message.data[2],0,127,0,200);
    }

    var sw = random(1,1)
    
    for (var i = 0; i < 200; i++) {
      function drawLines() {
        var linestartPositiion= random(0, window.innerWidth-100)
        var lineEndPositiion= random(0, window.innerWidth-50)
        
        
          line(linestartPositiion+random(0,100), window.innerHeight/3, lineEndPositiion, window.innerHeight/3+window.innerHeight/3)
          strokeWeight(sw)
          stroke(random(0,255))
        }
        drawLines() 
      }
      
      textSize(200);
      textAlign(CENTER, CENTER);
      text('BOTANICAL', window.innerWidth/2, window.innerHeight/2+20, window.innerHeight, window.innerHeight);
      fill(0, 0, 0);
    


    
  }
}