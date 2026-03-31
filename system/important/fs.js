// ------------------------------
// FS ROOT
// ------------------------------
function freshFS() {
    return { "/": {"CenturyFS":"9.7","bg":"/system/bg.png","bgtype":"system","firstboot":"1","apps":{"sb.js":`import { WindowCreator, renderWindow } from "/system/ui/ui.js"
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
win.newText("This will erase all apps, files, and settings in Windows CY.");
win.newText("Your system will reboot after reset.");

// Reset button
win.newButton("Reset Windows CY", async function () {
    await reinstall();     // wipe FS + reinstall fresh
    location.reload();     // simulate reboot
});

// Render window
renderWindow("Reset this PC", win.output, 360, 180);
`,"Notes.js":`import { WindowCreator, renderWindow } from "/system/ui/ui.js";
import { newFile } from "/system/important/fs.js";

let myWin = new WindowCreator();

myWin.newInput("txt");
myWin.newText("Save to... (Filename only plz)", "");
myWin.newInput("sve");

myWin.newButton("Save", function () {
    const filename = document.getElementById("sve").value;
    const contents = document.getElementById("txt").value;

    newFile("/notes/", filename, contents);
}, "btn");

renderWindow("Notes", myWin.output, 400, 300);
`,"TextRead":`import { WindowCreator, renderWindow } from "/system/ui/ui.js";
import { readFile } from "/system/important/fs.js";

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
`, "Files.js":`import { renderWindow, WindowCreator } from "/system/ui/ui.js";
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
`,"Splinternet Opener.js":`import { WindowCreator, renderWindow } from "/system/ui/ui.js";

const win = new WindowCreator();

// Build UI
win.newInput("a");
win.newButton("🔍", function () {
    const url = document.getElementById("a").value;
    document.getElementById("b").src = url;
});
win.newFrame("", "b");

// Render window
renderWindow("Splinternet Opener", win.output, 500, 200);

// After render, elements exist
`,"Turbo-V":`import { WindowCreator,renderWindow } from "/system/ui/ui.js";
const win = new WindowCreator
win.newButton("Do Windows Century VM",function(){document.getElementById("a").src = "/index.html"})
win.newButton("Do Windows 96 VM",function(){document.getElementById("a").src = "https://windows96.net"})
win.newButton("Do Windows 97 VM",function(){document.getElementById("a").src = "https://franx1024.github.io/Windows97/"})
win.newButton("Do Windows 99 VM",function(){document.getElementById("a").src = "https://win99.dev"})
win.newButton("Shut down currently open VM", () => {
    document.getElementById("a").src = "";
});
win.newFrame("", "a");
win.newText("By the way, recursion in the Windows Century VM only goes to layer 3. Layer 4 just doesn't work.")
renderWindow("Turbo-V",win.output,400,300)
`,"Import File":`import { WindowCreator, renderWindow } from "/system/ui/ui.js";
import { newFile } from "/system/important/fs.js";

const win = new WindowCreator;

win.newText("Drop base64-encoded file down here", "Bleh");
win.newInput("val");      // Base64 input
win.newInput("fname");    // Filename input

win.newButton("Import File", function () {
    let base64 = document.getElementById("val").value;
    const name = document.getElementById("fname").value || "imported.bin";

    // Remove data URL prefix if present
    if (base64.includes(",")) {
        base64 = base64.split(",")[1];
    }

    // Decode Base64 → binary string
    const binary = atob(base64);

    // Convert binary string → Uint8Array
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }

    // Write real binary file into CenturyFS
    newFile("/imported/", name, bytes);
});

renderWindow("Import File", win.output, 400, 300);
`,"Cracking the Doorway":`import { WindowCreator, renderWindow } from "/system/ui/ui.js";

const win = new WindowCreator();

// Create the iframe frame
win.newFrame("", "b","1080px",'720px');

// Render window first
renderWindow("Cracking the Doorway", win.output, 1080, 720);

// NOW the iframe exists in the DOM
const url = "https://jhfhngj.github.io/Cracking-the-Doorway/";
document.getElementById("b").src = url;
`,"Wallpaper Setter.js":`import { WindowCreator, renderBackground, renderWindow } from "/system/ui/ui.js";
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
`,"gato.js":`import { WindowCreator,renderWindow } from "/system/ui/ui.js";
const win = new WindowCreator
win.newImage(\`https://cataas.com/cat?t=\${Date.now()}\`,"gato")
win.newButton("Cat",function(){document.getElementById("gato").src = \`https://cataas.com/cat?t=\${Date.now()}\`;})
renderWindow("Cat",win.output,400,1000)
`,"Century News.js":`import { WindowCreator, renderWindow } from "/system/ui/ui.js";

const win = new WindowCreator();

function choice(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function range(start, end) {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    return Array.from({ length: end - start }, (_, i) => start + i);
}

let text = "";
const chars = range(32, 126).map(c => String.fromCodePoint(c));

for (let i = 0; i < 120; i++) {
    text += choice(chars);
}

win.newText("The Windows Century Times");
win.newText(text);

renderWindow("Century News", win.output, 400, 300);
`,"CenturyAI.js":`import { renderWindow,WindowCreator } from "/system/ui/ui.js";
const win = new WindowCreator
win.newInput("text")
function choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function expandClass(cls) {
    const chars = [];
    for (let i = 0; i < cls.length; i++) {
        if (cls[i+1] === '-' && cls[i+2]) {
            const start = cls.charCodeAt(i);
            const end = cls.charCodeAt(i+2);
            for (let c = start; c <= end; c++) chars.push(String.fromCharCode(c));
            i += 2;
        } else {
            chars.push(cls[i]);
        }
    }
    return chars;
}

function generateFromRegex(regex) {
    let i = 0;

    function parse() {
        let out = "";

        while (i < regex.length) {
            const ch = regex[i];

            if (ch === '[') {
                // character class
                i++;
                let cls = "";
                while (regex[i] !== ']') cls += regex[i++];
                i++; // skip ]
                const chars = expandClass(cls);
                out += choice(chars);
            }

            else if (ch === '(') {
                // group
                i++;
                let group = "";
                let depth = 1;
                while (depth > 0) {
                    if (regex[i] === '(') depth++;
                    if (regex[i] === ')') depth--;
                    if (depth > 0) group += regex[i];
                    i++;
                }
                out += generateFromRegex(group);
            }

            else if (ch === '|') {
                // alternation: pick left or right
                i++;
                const right = generateFromRegex(regex.slice(i));
                return Math.random() < 0.5 ? out : right;
            }

            else if (ch === '{') {
                // quantifier
                i++;
                let num = "";
                while (regex[i] !== '}') num += regex[i++];
                i++; // skip }
                const [min, max] = num.split(',').map(Number);
                const count = max ? (min + Math.floor(Math.random() * (max - min + 1))) : min;
                const last = out[out.length - 1];
                out = out.slice(0, -1) + last.repeat(count);
            }

            else if (ch === '+') {
                i++;
                const last = out[out.length - 1];
                out += last.repeat(1 + Math.floor(Math.random() * 3));
            }

            else if (ch === '*') {
                i++;
                const last = out[out.length - 1];
                out += last.repeat(Math.floor(Math.random() * 4));
            }

            else if (ch === '?') {
                i++;
                const last = out[out.length - 1];
                if (Math.random() < 0.5) out = out.slice(0, -1);
            }

            else {
                // literal character
                out += ch;
                i++;
            }
        }

        return out;
    }

    return parse();
}
function respond(text){
    document.getElementById("output").textContent = text;
}

function getInp(){
    return document.getElementById("text").value;
}

function isGreeting(text) {
    text = text.toLowerCase().trim();
    return /^(h[ei]y?|yo|g(ood )?(morning|evening|day)|sup|salut|hola|ciao)/.test(text);
}

function greeting(){
    const greets = ["hi", "hey", "hello", "yo", "sup", "hola", "salut", "ciao"];
    return choice(greets) + ", how are you?";
}

function think(){
    let gah = getInp().toLowerCase().trim();

    // pronoun flip
    gah = gah.replace(/\bi\b/g, "you");

    if (isGreeting(gah)) {
        respond(greeting());
    } else {
        respond("why do you " + gah + "?");
    }
}

win.newButton("Talk to me, CenturyAI, Talk to me!", think)
win.newText("AI output:")
win.newText("","output")
renderWindow("CenturyAI",win.output,800,600)
`,"Notes 2.0.js":`import { WindowCreator,renderWindow } from '/system/ui/ui.js'
import { splitFilenamePath, newFile } from '/system/important/fs.js'

var win = new WindowCreator

var myCodeMirror = win.newTextArea()

win.newText("File path?")
var fp = win.newInput()
win.newButton("Save to path", function(){
    newFile(splitFilenamePath(fp.value)[1],splitFilenamePath(fp.value)[0],myCodeMirror.value)
})

renderWindow("Notes 2.0",win.output,500,500)
`,"Century Packages.js":`import { WindowCreator, betterAlert, renderWindow } from "/system/ui/ui.js";
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
`}} };
}

let fs; // will be loaded asynchronously

// ------------------------------
// SAVE / LOAD
// ------------------------------
async function saveFS(fsb) {
    if (fsb) {
        const root = await navigator.storage.getDirectory();
        const file = await root.getFileHandle("w97.json", { create: true });
        const writable = await file.createWritable();
        await writable.write(JSON.stringify(fsb));
        await writable.close();
    } else {
    const root = await navigator.storage.getDirectory();
    const file = await root.getFileHandle("w97.json", { create: true });
    const writable = await file.createWritable();
    await writable.write(JSON.stringify(fs));
    await writable.close();
    }
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
    fs = freshFS();   // replace in-memory filesystem
    await saveFS();   // save the new one to disk
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

export function removeDir(path) {
    const parts = path.split("/").filter(Boolean);
    const name = parts.pop();
    const parent = resolvePath("/" + parts.join("/"));
    delete parent[name];
    saveFS();
}

// ------------------------------
// HELPER FUNCTIONS
// ------------------------------

export function splitFilenamePath(toSplit) {
    var now = toSplit.split("/")
    var file = now.pop()
    var path = now.join("/")
    return [file,path]
}

// ------------------------------
// INITIALIZE FS
// ------------------------------
console.log("fs.js loaded");
console.log("fs.js is currently reloading or creating Windows CY disk...");

fs = await loadFS(); // IMPORTANT FIX
import { WindowCreator,renderWindow,betterAlert } from "/system/ui/ui.js";
function safemode() {
    // Create Recovery Mode window
    const win = new WindowCreator
    win.newText("The FS has not been detected and as a result of this, fs.js has decided to enter FScovery Mode. fs.js has given you these options to repair your filesystem, including reinstalling the OS.")
    win.newButton("Reinstall Windows Century",function(){reinstall();betterAlert("Reinstallation Complete.")})
    win.newButton("Restore from Backup",async function(){var input = document.createElement("input");
        input.type = "file";
        input.onchange = async () => {
            await importFS(input.files[0]);
            console.log("Restored!");
            betterAlert("Restoration Complete.")
        };
        input.click();
    })
    win.newButton("Exit",function(){location.reload();win.remove();})
    renderWindow("Recovery Mode",win.output,innerWidth,innerHeight)
}

try {
    listDir("/")
    readFile("/","bgtype")
    newFile("/","test")
    removeFile("/","test")
} catch {
    console.log("FS NOT FOUND OR IS EMPTY!")
    console.log("Entering FScovery mode...")
    safemode()
}

try {
    console.log("fs.js version",readFile("/","CenturyFS"))
} catch (error) {
    console.log("CenturyFS version not found")
}

