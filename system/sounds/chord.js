window.chord = new Audio('/system/sounds/chord.mp3');
window.addEventListener("error", () => {
    window.chord.play();
});
