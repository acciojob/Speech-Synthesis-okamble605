// Your script here.
// Initialize the SpeechSynthesisUtterance object
const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

// Fetch available voices and populate the dropdown
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set the selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
}

// Set the rate and pitch dynamically
function setOption() {
  msg[this.name] = this.value;
}

// Start speaking the text
function speakText() {
  msg.text = document.querySelector('[name="text"]').value;
  speechSynthesis.cancel(); // Cancel if already speaking
  speechSynthesis.speak(msg);
}

// Stop speaking
function stopSpeaking() {
  speechSynthesis.cancel();
}

// Event listeners
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', speakText);
stopButton.addEventListener('click', stopSpeaking);
