const synth = window.speechSynthesis;

export function readText(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "vi-VN";
  synth.speak(utterance);
}

export function stopReading() {
  synth.cancel();
}