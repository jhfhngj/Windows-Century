import { WindowCreator, renderBackground, renderWindow } from "/system/ui/ui.js";
import { newFile } from "/system/important/fs.js";

const win = new WindowCreator();

win.newText("Base64 encoded without data URI note");
win.newInput("pth");

win.newButton("Set", function () {
    const path = document.getElementById("pth").value;

    const full = "data:image/png;base64," + path;

    newFile("/", "bg", full);
    newFile("/", "bgtype", "system"); // or whatever you want
    renderBackground(full);
});

renderWindow("Wallpaper Setter", win.output, 400, 300);
