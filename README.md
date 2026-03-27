# 🌐 **Windows Century**
A browser‑native operating system simulation with a persistent virtual filesystem, modular apps, and a retro‑inspired windowing environment — all running client‑side.

<p align="center">
  <img src="w97.png" alt="Windows Century logo — looks like Windows 3.1’s logo, but the panes are replaced with a peanut‑butter‑sandwich / Tac Nyan pop‑tart filling." width="256">
</p>

---

## 🚀 Overview
Windows Century is a fake OS that runs entirely in your browser.  
It’s inspired by the Windows93/96/97/99 lineage, but built with a more structured, modern approach.

The system includes:

- A persistent virtual filesystem  
- A window manager  
- Built‑in apps  
- A simple app framework  
- A reset mechanism  
- No backend, no servers, no tracking  

Everything lives inside the browser.

### Note
The GitHub Pages hosting of Windows Century isn't working right now. Soon I'll set up yet another server and host it there, but in the meantime you can get Python, run `python3 -m http.server` in Windows Century's directory, and go to localhost:8000 in your browser. Don't worry, you'll see later that (spoiler alert) the user files aren't on server's disk, it's on client's disk, so you'll have so much space.

---

## 📁 Filesystem
Windows Century stores its entire virtual disk in the browser’s storage as:

```
w97.json
```

This file contains:

- Directories  
- Files  
- Installed apps  
- User data  

The OS loads this file at boot and saves changes automatically.

---

## 🧩 Built‑in Apps
Windows Century includes several basic apps:

- **Notes** — create and save text files  
- **Text Reader** — open and view files  
- **Image Viewer** — load images from URLs  
- **Files** — browse directories  
- **Reset this PC** — reinstall the OS  
- **sb.js** — ooh pretty images  

Apps live under `/apps/` inside the virtual filesystem.

---

## 🪟 UI Framework
Apps are built using a small UI toolkit located under `/system/ui/ui.js`:

- `WindowCreator` — build window contents  
- `renderWindow()` — display a window  
- Inputs, buttons, text, images, iframes, etc.  

This makes it easy to create new apps with minimal boilerplate.

If you want to make an app that uses the filesystem, the FS interface lives under `/system/important/fs.js`:

- `listDir(path)` — returns `[name, value]` pairs  
- `createDirTreeTo(path)` — ensures a directory path exists  
- `newFile(path, name, contents)` — create a file  
- `readFile(path, name)` — read a file  
- `removeFile(path, name)` — delete a file  
- `copyFile(path1, name1, path2, name2)` — copy a file  
- `renameFile(path, name, newName)` — rename a file  
- `reinstall()` — reinstall Windows Century  

> *“But why can’t I just write to system?”*  
> Because the system is the real website, not the virtual filesystem.  
> You’re editing the OS, not the server. Okay?

---

## 🔄 Resetting the OS
The **Reset this PC** app reinstalls the default filesystem.

If the reset button doesn’t work (rare browser storage issue), you can manually clear the OS storage:

### **Edge**
1. Open `edge://settings/privacy/cookies/allCookies`  
2. Search for your domain  
3. Delete the entry  
4. Restart the browser  

This fully wipes the virtual disk.

---

## 🛠️ Developing Apps
Apps are simple ES modules stored in `/apps/`.

Example structure:

```js
import { WindowCreator, renderWindow } from "/system/ui/ui.js";

const win = new WindowCreator();
win.newText("Hello world");
renderWindow("Foo bar bad baf doo", win.output, 400, 300);
```

The OS loads and runs apps dynamically.

---

## 📦 Project Structure
```
/system
    /ui        → window manager + UI toolkit
    /important → filesystem logic
/apps          → user apps (inside virtual FS)
/boot          → bootloader + startup scripts
/user          → nothing
index.html
```

---

## 🧪 Status
Windows Century is in early development.  
Expect rough edges, missing features, and occasional browser‑storage quirks.

---

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-sa/4.0/)
