import { WindowCreator, renderWindow } from "/system/ui/ui.js";

const win = new WindowCreator();

// Build UI
win.newInput("a");
win.newButton("🔍", function () {
    const url = document.getElementById("a").value;
    document.getElementById("b").src = url;
});
win.newFrame("", "b");

// Render window
renderWindow("Splinternet Opener", win.output, 300, 300);

// After render, elements exist
