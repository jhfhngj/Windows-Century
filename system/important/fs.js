// ------------------------------
// FS ROOT
// ------------------------------
function freshFS() {
    return { "/": {"apps":{"sb.js":`import { WindowCreator, renderWindow } from "/system/ui/ui.js"
    var bodyDiv = new WindowCreator
    bodyDiv.newButton("This image is not beautiful", function(){document.getElementById("image").remove();document.getElementById("image2").remove()},"doom")
    bodyDiv.newText("Or is it?","")
    bodyDiv.newImage("https://th.bing.com/th/id/OIP._2K-QIG2KFVN-e8SFeVbdQHaE8?w=234&h=180&c=7&r=0&o=7&pid=1.7&rm=3","image2")
    bodyDiv.newFrame("https://th.bing.com/th/id/OIP._2K-QIG2KFVN-e8SFeVbdQHaE8?w=234&h=180&c=7&r=0&o=7&pid=1.7&rm=3","image")
    bodyDiv = bodyDiv.output
    
    renderWindow("More beautiful images", bodyDiv, 400, 600);`,"ImageView.js":`import { WindowCreator, renderWindow } from "/system/ui/ui.js";

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
`,"Reset this PC.js":`import { WindowCreator, renderWindow } from "/system/ui/ui.js";
import { reinstall } from "/system/important/fs.js";

var win = new WindowCreator();

// Warning text
win.newText(
    "This will erase all apps, files, and settings in Windows CY.")win.newText("Your system will reboot after reset."
);

// Reset button
win.newButton("Reset Windows CY", async function () {
    await reinstall();     // wipe FS + reinstall fresh
    location.reload();     // simulate reboot
});

// Render window
renderWindow("Reset this PC", win.output, 360, 180);
`}} };
}

let fs; // will be loaded asynchronously

// ------------------------------
// SAVE / LOAD
// ------------------------------
async function saveFS() {
    const root = await navigator.storage.getDirectory();
    const file = await root.getFileHandle("w97.json", { create: true });
    const writable = await file.createWritable();
    await writable.write(JSON.stringify(fs));
    await writable.close();
}

async function loadFS() {
    const root = await navigator.storage.getDirectory();
    try {
        const file = await root.getFileHandle("w97.json");
        const blob = await file.getFile();
        return JSON.parse(await blob.text());
    } catch {
        return freshFS();
    }
}

// ------------------------------
// PATH RESOLVER
// ------------------------------
function resolvePath(path) {
    const parts = path.split("/").filter(Boolean);
    let node = fs["/"]; // IMPORTANT FIX

    for (const part of parts) {
        if (!node[part]) node[part] = {};
        node = node[part];
    }

    return node;
}

// ------------------------------
// FILE OPERATIONS
// ------------------------------
export function newFile(path, name, contents) {
    const dir = resolvePath(path);
    dir[name] = contents;
    saveFS();
}

export function readFile(path, name) {
    const dir = resolvePath(path);
    return dir[name];
}

export function removeFile(path, name) {
    const dir = resolvePath(path);
    delete dir[name];
    saveFS();
}

export function copyFile(path1, name1, path2, name2) {
    const dir1 = resolvePath(path1);
    const dir2 = resolvePath(path2);
    dir2[name2] = dir1[name1];
    saveFS();
}

export function renameFile(path, name, newName) {
    const dir = resolvePath(path);
    dir[newName] = dir[name];
    delete dir[name];
    saveFS();
}

export async function reinstall() {
    await saveFS(freshFS())
}

// ------------------------------
// DIRECTORY OPERATIONS
// ------------------------------

export function listDir(path) {
    const dir = resolvePath(path)
    return Object.entries(dir)
}

export function createDirTreeTo(path) {
    resolvePath(path)
}

// ------------------------------
// INITIALIZE FS
// ------------------------------
console.log("fs.js loaded");
console.log("fs.js is currently reloading or creating Windows CY disk...");

fs = await loadFS(); // IMPORTANT FIX
