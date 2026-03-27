import { renderWindow, WindowCreator } from "/system/ui/ui.js";
import { listDir } from "/system/important/fs.js";

let curdir = "/";

let win = new WindowCreator();

// UI elements
win.newText("", "cr");               // current directory label
win.newText("Entries:", "en");       // entries list
win.newText("Enter abs path to enter:");
win.newInput("te");                  // path input
win.newButton("Enter", function () {
    curdir = document.getElementById("te").value;
    update();
});

// Render window
renderWindow("Files", win.output, 400, 300);

// After render, grab elements
const current = document.getElementById("cr");
const entries = document.getElementById("en");
const dirInput = document.getElementById("te");

// Update function
function update() {
    const dir = listDir(curdir);

    current.textContent = "Directory: " + curdir;

    // reset entries
    entries.textContent = "Entries:";

    dir.forEach(([name, value]) => {
        if (typeof value === "object") {
            entries.textContent += "  [DIR] " + name;
        } else {
            entries.textContent += "  [FILE] " + name;
        }
    });
}

// Live update on typing
dirInput.oninput = update;

// Initial load
update();
