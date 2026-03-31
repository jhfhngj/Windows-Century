import { WindowCreator, betterAlert, renderWindow } from "/system/ui/ui.js";
import { newFile, splitFilenamePath } from "/system/important/fs.js";

const win = new WindowCreator();
const repo = "https://raw.githubusercontent.com/jhfhngj/Windows-Century-Packages/Mainly-Main/";

// PACKAGE LIST DISPLAY
var packages = win.newTextArea();
packages.readOnly = true;

// Load package list
fetch(repo + "packages")
    .then(r => r.text())
    .then(t => packages.value = t);

// UI
win.newText("In the input below enter package name to install.");
var input = win.newInput();

// INSTALL BUTTON
win.newButton("Install!", function () {
    const pkg = input.value.trim();
    if (!pkg) return betterAlert("Enter a package name first!");

    // Fetch package JSON
    fetch(repo + pkg + ".json")
        .then(r => {
            if (!r.ok) throw new Error("Package not found");
            return r.json();
        })
        .then(value => {
            // Extract install path + filename
            const [filename, path] = splitFilenamePath(value.installTo);

            // Write file to CenturyFS
            newFile(path, filename, value.contents);

            betterAlert("Installed successfully!");
        })
        .catch(err => {
            betterAlert("Installation failed: " + err.message);
        });
});

renderWindow("Century Packages", win.output, 400, 300);
