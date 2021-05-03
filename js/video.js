// TODO: Make a place to assign CHs for knobs and sliders that control prams //

var winWidth = window.innerWidth;
var winHeight = window.innerHeight;

let img

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

function preload() {
  img = loadImage('https://cors-anywhere.herokuapp.com/https://media1.giphy.com/media/hrdX1BsUBq7DkGJCCd/giphy.gif');
}
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
  let clock;
  let red = 50;
  let green = 50;
  let blue = 50;
  let alpha = 50;
  let size = 50;
  
    function onMidiMessage(message) {
      
      
        if (message.data[1] === 25) {
          red = map(message.data[2],0,127,0,255)
        }
        if (message.data[1] === 26) {
          green = map(message.data[2],0,127,0,255)
        }
        if (message.data[1] === 27) {
          blue = map(message.data[2],0,127,0,255)
        }
        if (message.data[1] === 28) {
          alpha = map(message.data[2],0,127,0,255)
        }
        if (message.data[1] === 29) {
          size = map(message.data[2],0,127,0,1900)
        } 

        

        
    }
    function draw() {
      tint(blue,red, green); // Tint blue
      image(img,0,0, winWidth, winHeight )


      //noStroke()
      strokeWeight(random(3,6))
      fill(red,green,blue, alpha)
      ellipse(winWidth/2,winHeight/2,size,size)

      r=random(0,winWidth)

      stroke(0,0,0)
      strokeWeight(random(3,6))
      line(r,0,r,winHeight)

      stroke(0,0,0)
      strokeWeight(random(1,1))
      line(r,0,r,winHeight)
      
      stroke(0,0,0)
      strokeWeight(random(1,1))
      line(r,0,r,winHeight)

      stroke(0,0,0)
      strokeWeight(random(1,1))
      line(r,0,r,winHeight)
      
      stroke(0,0,0)
      strokeWeight(random(1,1))
      line(r,0,r,winHeight)

      stroke(0,0,0)
      strokeWeight(random(1,1))
      line(r,0,r,winHeight)
      
      stroke(0,0,0)
      strokeWeight(random(1,1))
      line(r,0,r,winHeight)

    }
  
// Draws Objects //
