import { WindowCreator, renderWindow } from "../ui/ui.js";
import { readFile } from "../important/fs.js";

let myWin = new WindowCreator();

myWin.newText("Read from path...", "");
myWin.newInput("path");

myWin.newText("Filename...", "");
myWin.newInput("fn");

myWin.newText("Output:", "");
myWin.newInput("op");

myWin.newButton("Read to output", function () {
    const path = document.getElementById("path").value;
    const filename = document.getElementById("fn").value;
    const output = document.getElementById("op");

    output.value = readFile(path, filename);
});

renderWindow("Text file reader", myWin.output, 400, 300);
