import { WindowCreator, renderWindow } from "/system/ui/ui.js";

const win = new WindowCreator();

// Create the iframe frame
win.newFrame("", "b","1080px",'720px');

// Render window first
renderWindow("Cracking the Doorway", win.output, 1080, 720);

// NOW the iframe exists in the DOM
const url = "https://jhfhngj.github.io/Cracking-the-Doorway/";
document.getElementById("b").src = url;
