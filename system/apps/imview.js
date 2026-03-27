import { WindowCreator, renderWindow } from "/system/ui/ui.js";

var win = new WindowCreator();

// Label
win.newText("Enter image URL:", "img-label");

// Input box
win.newInput("img-url");

// Load button
win.newButton("Load", function () {
    const url = document.getElementById("img-url").value.trim();
    if (!url) return;

    // Remove previous image if it exists
    const old = document.getElementById("img-viewer-img");
    if (old) old.remove();

    // Add new image
    win.newImage(url, "img-viewer-img");
});

// Render window
renderWindow("Image Viewer", win.output, 400, 350);
