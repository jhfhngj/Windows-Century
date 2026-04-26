// ------------------------------
// FS ROOT
// ------------------------------
//function freshFS() {
    return { "/": {"ThirdPartyLicenses.md":`# Third‑Party Components\
\
## W95FA Font\
© The W95FA Authors  \
Licensed under the SIL Open Font License 1.1  \
The original license file is included as provided by the author.\
\
## Marked Markdown Parser\
© The Marked Project Authors  \
Licensed under the MIT License  \
The original license file is included as provided by the author.\
`,"CenturyFS":"11.0","repo":"https://raw.githubusercontent.com/jhfhngj/Windows-Century-Packages/Mainly-Main/","bg":"/system/bg.png","bgtype":"system","firstboot":"1","apps":{"sb.js":`import { WindowCreator, renderWindow } from "/system/ui/ui.js"
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
`,"TextRead.js":`import { WindowCreator, renderWindow } from "/system/ui/ui.js";
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
import { URLer } from "/system/important/fsurl.js";

const win = new WindowCreator();

// Build UI
win.newInput("a");
win.newButton("🔍", function () {
    const url = URLer(document.getElementById("a").value);
    document.getElementById("b").src = url;
});
win.newFrame("", "b");

// Render window
renderWindow("Splinternet Opener", win.output, 300, 300);

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
import { readFile, newFile, splitFilenamePath } from "/system/important/fs.js";

const win = new WindowCreator();
const defaultrepo = "https://raw.githubusercontent.com/jhfhngj/Windows-Century-Packages/Mainly-Main/";
var repo = readFile("/","repo") || defaultrepo

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
`,"Settings.js":`import { newFile, readFile } from "/system/important/fs.js";
import { WindowCreator,renderWindow,betterPrompt } from "/system/ui/ui.js";
const win = new WindowCreator
function loadScript(code, callback) {
    try {
        const script = document.createElement('script');
        script.textContent = code;
        script.type = 'module'; // does this hurt no
        script.onload = () => {
            console.log(\`Script loaded: \${code}\`);
            if (typeof callback === 'function') callback(code);
        };
        script.onerror = () => {
            console.error(\`Failed to load script: \${code}\`);
        };
        document.head.appendChild(script);
    } catch (err) {
        console.error("Error loading script:", err);
    }
}
win.newText("Settings")
win.newSplit()
win.newButton("Change main package repository",function(){
    betterPrompt("Repo?",function(val){newFile("/","repo",val)})
})
win.newSplit()
win.newButton("Set wallpaper",function(){
    loadScript(readFile("/apps/","Wallpaper Setter.js"))
})
renderWindow("Settings",win.output,400,300)
`,"CodeEdit.js":`import { renderWindow, WindowCreator } from "/system/ui/ui.js";

const win = new WindowCreator
win.newWebCode("python")
renderWindow("CodeEdit",win.output,500,500)
`,"CTerm.js":`import { renderWindow, WindowCreator } from "/system/ui/ui.js"
const win = new WindowCreator
var a = win.newTextArea()
a.style.width = 490
a.style.height = 500
var inp = win.newInput()
const log = function(toPrint){
    a.value = a.value + toPrint.toString() + "\\n"
}
win.newButton("Determine", function(){a.value += eval(inp.value).toString() + "\\n"})
renderWindow("CTerm",win.output,500,600)`,"MusicListen.js":`import { readFile, splitFilenamePath } from "/system/important/fs.js";
import { renderWindow, WindowCreator } from "/system/ui/ui.js";

const win = new WindowCreator
win.newText("Music Player\nEnter path below")

const input = win.newInput()
const canvas = win.newCanvas()

win.newButton("Play", function() {

    const path = input.value
    const [file, folder] = splitFilenamePath(path)

    const audio = document.createElement("audio")
    audio.src = "data:audio/mp3;base64,"+readFile(file, folder)
    document.body.appendChild(audio)

    const ctx = canvas.getContext("2d")
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const analyser = audioCtx.createAnalyser()
    const source = audioCtx.createMediaElementSource(audio)

    source.connect(analyser)
    analyser.connect(audioCtx.destination)

    analyser.fftSize = 256
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    function draw() {
        requestAnimationFrame(draw)
        analyser.getByteFrequencyData(dataArray)

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const barWidth = (canvas.width / bufferLength) * 2.5
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i]
            ctx.fillStyle = \`rgb(\${barHeight + 100}, 50, 150)\`
            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2)
            x += barWidth + 1
        }
    }

    audio.play().then(() => {
        audioCtx.resume()
        draw()
    })
})

renderWindow("MusicListen", win.output, 500, 500)
`,"DownloadTool.js":`import { newFile, readFile, splitFilenamePath } from "/system/important/fs.js";
import { WindowCreator, renderWindow, betterAlert } from "/system/ui/ui.js";
import { URLer } from "/system/important/fsurl.js"; // your fs:// handler

// ------------------------------
// BASE64 ENCODER FOR BINARY
// ------------------------------
function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

// ------------------------------
// MAIN DOWNLOADER LOGIC
// ------------------------------
async function downloadToCenturyFS(url, savePath, saveName) {
    try {
        let resolvedURL = URLer(url);

        // If URLer returned a regular http(s) URL, wrap with CORS proxy
        if (resolvedURL.startsWith("http://") || resolvedURL.startsWith("https://")) {
            resolvedURL = \`https://cors.eu.org/\${resolvedURL}\`;
        }

        const res = await fetch(resolvedURL);
        if (!res.ok) throw new Error("HTTP " + res.status);

        const type = res.headers.get("content-type") || "";
        let contents;

        if (type.startsWith("text/") || type.startsWith("application/") || type.includes("json") || type.includes("xml")) {
            contents = await res.text();
        } else {
            const buf = await res.arrayBuffer();
            contents = arrayBufferToBase64(buf);
        }

        newFile(savePath, saveName, contents);
        betterAlert("Download complete and saved to CenturyFS.");
    } catch (err) {
        betterAlert("Download failed: " + err.message);
    }
}

// ------------------------------
// GUI APP
// ------------------------------
if (true) {
    const win = new WindowCreator();

    win.newText("Century Downloader\nEnter a URL and choose where to save.");

    const urlInput = win.newInput();
    urlInput.placeholder = "https://example.com/file.mp3 or fs://folder/file";

    const pathInput = win.newInput();
    pathInput.placeholder = "Save path (e.g. /downloads)";

    const nameInput = win.newInput();
    nameInput.placeholder = "Save as (e.g. song.mp3)";

    win.newButton("Download", async function () {
        const url = urlInput.value.trim();
        const savePath = pathInput.value.trim();
        const saveName = nameInput.value.trim();

        if (!url || !savePath || !saveName) {
            betterAlert("Please fill all fields.");
            return;
        }

        await downloadToCenturyFS(url, savePath, saveName);
    });

    renderWindow("Century Downloader", win.output, 450, 300);
}
`,"MarkThatDown.js":`import { readFile, splitFilenamePath } from "/system/important/fs.js";
import { WindowCreator,renderWindow } from "/system/ui/ui.js";
import { marked } from "/system/libs/marked.esm.js"

const win = new WindowCreator
win.newText("MarkThatDown (Uses Marked)")
win.newText("To open")
const a=win.newInput()
win.newButton("Open!",function(){
    ca.innerHTML = marked.parse(readFile(splitFilenamePath(a.value)[1],splitFilenamePath(a.value)[0]))
})
const ca = win.newDiv()
renderWindow("MarkThatDown (Uses Marked)",win.output,400,300)
`}} };

// CenturyFS 11.0
// - Real OPFS filesystem
// - Backward compatible with <=10.0 w97.json
// - Same function names: freshFS, loadFS, saveFS, newFile, readFile, reinstall

const META_FILE = ".centuryfs.json";
const LEGACY_FILE = "w97.json";

// ------------------------------
// Old-style freshFS (JSON structure)
// ------------------------------
export function freshFS() {
    return {
        "/": {
            "apps": {
                "sb.js": `import { WindowCreator, renderWindow } from "/system/ui/ui.js"
var bodyDiv = new WindowCreator
bodyDiv.newButton("This image is not beautiful", function(){document.getElementById("image").remove();document.getElementById("image2").remove()},"doom")
bodyDiv.newText("Or is it?","")
bodyDiv.newImage("https://th.bing.com/th/id/OIP._2K-QIG2KFVN-e8SFeVbdQHaE8?w=234&h=180&c=7&r=0&o=7&pid=1.7&rm=3","image2")
bodyDiv.newFrame("https://th.bing.com/th/id/OIP._2K-QIG2KFVN-e8SFeVbdQHaE8?w=234&h=180&c=7&r=0&o=7&pid=1.7&rm=3","image")
bodyDiv = bodyDiv.output

renderWindow("More beautiful images", bodyDiv, 400, 600);`,
                "ImageView.js": `import { WindowCreator, renderWindow } from "/system/ui/ui.js";

var win = new WindowCreator();

// Label
win.newText("Enter image URL:", "img-label");

// Input box
win.newInput("img-url");

// Load button
win.newButton("Load", function () {
    const url = document.getElementById("img-url").value.trim();
    if (!url) return;

    const old = document.getElementById("img-viewer-img");
    if (old) old.remove();

    win.newImage(url, "img-viewer-img");
});

renderWindow("Image Viewer", win.output, 400, 350);
`,
                "Reset this PC.js": `import { WindowCreator, renderWindow } from "/system/ui/ui.js";
import { reinstall } from "/system/important/fs.js";

var win = new WindowCreator();

win.newText(
    "This will erase all apps, files, and settings in Windows97.\\nYour system will reboot after reset."
);

win.newButton("Reset Windows97", async function () {
    await reinstall();     // wipe FS + reinstall fresh
    location.reload();     // simulate reboot
});

renderWindow("Reset this PC", win.output, 360, 180);
`
            }
        }
    };
}

// ------------------------------
// Core OPFS helpers
// ------------------------------
async function getRoot() {
    return await navigator.storage.getDirectory();
}

async function loadMeta() {
    const root = await getRoot();
    try {
        const file = await root.getFileHandle(META_FILE);
        const blob = await file.getFile();
        return JSON.parse(await blob.text());
    } catch {
        // No meta yet → assume legacy
        return { version: 10 };
    }
}

async function saveMeta(meta) {
    const root = await getRoot();
    const file = await root.getFileHandle(META_FILE, { create: true });
    const w = await file.createWritable();
    await w.write(JSON.stringify(meta));
    await w.close();
}

function splitPath(fullPath) {
    const parts = fullPath.split("/").filter(Boolean);
    const name = parts.pop() || "";
    const dirPath = "/" + parts.join("/");
    return { dirPath, name };
}

async function opfsGetDir(path) {
    const root = await getRoot();
    const parts = path.split("/").filter(Boolean);
    let dir = root;
    for (const part of parts) {
        dir = await dir.getDirectoryHandle(part, { create: true });
    }
    return dir;
}

async function opfsWriteFile(fullPath, contents) {
    const { dirPath, name } = splitPath(fullPath);
    const dir = await opfsGetDir(dirPath);
    const file = await dir.getFileHandle(name, { create: true });
    const w = await file.createWritable();
    await w.write(contents);
    await w.close();
}

async function opfsReadFile(fullPath) {
    const { dirPath, name } = splitPath(fullPath);
    const dir = await opfsGetDir(dirPath);
    const file = await dir.getFileHandle(name);
    const blob = await file.getFile();
    return await blob.text(); // swap to arrayBuffer() for binary
}

// ------------------------------
// Walk old JSON FS → OPFS
// ------------------------------
// node: object tree from freshFS / legacy w97.json
// currentPath: string like "/" or "/apps"
async function walkLegacyNode(node, currentPath) {
    if (!node || typeof node !== "object") return;

    for (const [key, value] of Object.entries(node)) {
        const nextPath = currentPath === "/" ? `/${key}` : `${currentPath}/${key}`;

        if (typeof value === "string") {
            await opfsWriteFile(nextPath, value);
        } else if (value && typeof value === "object") {
            await walkLegacyNode(value, nextPath);
        }
    }
}

// ------------------------------
// Migration from <=10.0 w97.json
// ------------------------------
async function migrateFrom10() {
    const root = await getRoot();
    try {
        const file = await root.getFileHandle(LEGACY_FILE);
        const blob = await file.getFile();
        const legacyFS = JSON.parse(await blob.text());

        if (legacyFS && typeof legacyFS === "object") {
            for (const [topKey, node] of Object.entries(legacyFS)) {
                if (topKey === "/") {
                    await walkLegacyNode(node, "/");
                } else if (node && typeof node === "object") {
                    await walkLegacyNode(node, topKey);
                }
            }
        }

        await saveMeta({ version: 11 });
        // optional: await root.removeEntry(LEGACY_FILE);
    } catch {
        // No legacy FS → create fresh from freshFS()
        const fsObj = freshFS();
        if (fsObj && typeof fsObj === "object") {
            for (const [topKey, node] of Object.entries(fsObj)) {
                if (topKey === "/") {
                    await walkLegacyNode(node, "/");
                } else if (node && typeof node === "object") {
                    await walkLegacyNode(node, topKey);
                }
            }
        }
        await saveMeta({ version: 11 });
    }
}

async function ensureFSReady() {
    const meta = await loadMeta();
    if (!meta.version || meta.version < 11) {
        await migrateFrom10();
    }
}

// ------------------------------
// Public API (same names)
// ------------------------------

// <=10.0: returned JSON FS
// 11.0: ensure OPFS is ready, return minimal descriptor
export async function loadFS() {
    await ensureFSReady();
    return { version: 11 };
}

// <=10.0: wrote whole FS JSON to w97.json
// 11.0: interpret fsb as map of paths -> contents (if used)
export async function saveFS(fsb) {
    await ensureFSReady();

    if (!fsb || typeof fsb !== "object") return;

    for (const [path, contents] of Object.entries(fsb)) {
        if (typeof path === "string") {
            await opfsWriteFile(path, contents);
        }
    }
}

// newFile compatibility:
// - newFile(content, path)
// - newFile(path, name, contents)
export async function newFile(a, b, c) {
    await ensureFSReady();

    if (c !== undefined) {
        const base = a.endsWith("/") ? a : a + "/";
        const fullPath = base + b;
        await opfsWriteFile(fullPath, c);
    } else {
        const content = a;
        const path = b;
        await opfsWriteFile(path, content);
    }
}

export async function readFile(path) {
    await ensureFSReady();
    return await opfsReadFile(path);
}

// ------------------------------
// reinstall: wipe OPFS, then reapply freshFS() via wrapper
// ------------------------------
export async function reinstall() {
    const root = await getRoot();

    // wipe everything except META_FILE (we'll overwrite meta anyway)
    for await (const entry of root.values()) {
        if (entry.kind === "file") {
            if (entry.name === META_FILE) continue;
            await root.removeEntry(entry.name);
        } else if (entry.kind === "directory") {
            await root.removeEntry(entry.name, { recursive: true });
        }
    }

    // Use freshFS() JSON and write it into OPFS
    const fsObj = freshFS();
    if (fsObj && typeof fsObj === "object") {
        for (const [topKey, node] of Object.entries(fsObj)) {
            if (topKey === "/") {
                await walkLegacyNode(node, "/");
            } else if (node && typeof node === "object") {
                await walkLegacyNode(node, topKey);
            }
        }
    }

    await saveMeta({ version: 11 });
}

fetch("CenturyFS 11.0")