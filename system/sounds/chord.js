import { betterAlert } from "/system/ui/ui.js";
window.chord = new Audio('/system/sounds/chord.mp3');
window.addEventListener("error", () => {
    window.chord.play();
});
old = console.error
console.error = function(data){
    old(data)
    window.chord.play()
    betterAlert(`Error occurred: ${data}`)
}
