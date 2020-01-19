let context = null;
let gainNode1 = null;
let gainNode2 = null;
let gainNode3 = null;
let oscNode1 = null;
let oscNode2 = null;
let oscNode3 = null;
var notesFrequency;

function createFrequencyValues(){

  // initialize the first layer of the associative array
  for (var i = 0; i < 9; i++){
    notesFrequency[i] = [];
  }

  noteFreq[1]["C"] = 32.703195662574829;
  noteFreq[1]["C#"] = 34.647828872109012;
  noteFreq[1]["D"] = 36.708095989675945;
  noteFreq[1]["D#"] = 38.890872965260113;
  noteFreq[1]["E"] = 41.203444614108741;
  noteFreq[1]["F"] = 43.653528929125485;
  noteFreq[1]["F#"] = 46.249302838954299;
  noteFreq[1]["G"] = 48.999429497718661;
  noteFreq[1]["G#"] = 51.913087197493142;
  noteFreq[1]["A"] = 55.000000000000000;
  noteFreq[1]["A#"] = 58.270470189761239;
  noteFreq[1]["B"] = 61.735412657015513;
} // createFrequencyValues

/* How to make mouse position start at centre of the page?
* How do I web scrape data from the International Space Station in order to determine
* how far an asteroid is away from Earth?
*
* You should be able to adjust volume. The gain is facking annoying.
* */

/* Starts the signals by activating oscillators */
window.onload = function(){
    context = new (window.AudioContext || window.webkitAudioContext)();
    gainNode1 = context.createGain();
    gainNode2 = context.createGain();
    gainNode3 = context.createGain();

    gainNode1.gain.value = 0.5;
    gainNode2.gain.value = gainNode1.gain.value;
    gainNode3.gain.value = gainNode2.gain.value;
    gainNode1.connect(context.destination);
    gainNode2.connect(context.destination);
    gainNode3.connect(context.destination);

    // volume Control

    oscNode1 = context.createOscillator();
    oscNode2 = context.createOscillator();
    oscNode3 = context.createOscillator();
    oscNode1.start();
    oscNode2.start();
    oscNode3.start();
} // onload

// Change the frequencies of the oscillators based on the vicinity of the Asteroid (aka the mouse)
// wrt to Earth
function findVicinity(e){
  oscNode1.type = "sawtooth";
  oscNode1.frequency.value = 261.625565300598 + e.pageX + e.pageY; // middle C
  oscNode1.connect(gainNode1);

  oscNode2.type = "sawtooth";
  oscNode2.frequency.value = 349.228 + e.pageX + e.pageY; // F
  oscNode2.connect(gainNode2);

  oscNode3.type = "sawtooth";
  oscNode3.frequency.value = 466.164 + e.pageX + e.pageY; // G
  oscNode3.connect(gainNode3);

  console.log(e.pageX + " " + e.pageY);
  console.log(oscNode1.frequency.value);
  $("#AsteroidContainer").css("left", e.pageX + "px");
  $("#AsteroidContainer").css("top", e.pageY + "px");

  playing = true;
}

window.addEventListener("mousemove", findVicinity, false);
window.addEventListener("load", createFrequencyValues, false);
