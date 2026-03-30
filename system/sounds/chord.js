export const chord = new Audio('/system/sounds/chord.mp3');
const chord = new Audio('/system/sounds/chord.mp3');
window.onerror = function(){
    chord.play()
}
