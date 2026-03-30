export const chord = new Audio('/system/sounds/chord.mp3');
const chord = new Audio('/system/sounds/chord.mp3');
document.onerror = function(){
    chord.play()
}