# 🌐 **Windows Century**
A browser‑native operating system simulation with a persistent virtual filesystem, modular apps, and a retro‑inspired windowing environment — all running client‑side.

<img src="w97.png" alt="Windows Century's logo. Looks like Windows 3.1's logo, but instead of the Windows, it's a peanut butter sandwich's insides or Tac Nyan/Nayn's pop tart." width="256" align="center">

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

If you want to make an app that uses the filesystem, no I am not forgetful, there is a nice FS interface located under `/system/important/fs.js`:

- `listDir()` — returns a list filled with 2-length lists with of each first element being the name and second element being the contents.
- `createDirTreeTo()` — Do I even need to explain this?
- `newFile()` — Creates a new file with the containing directory, the filename, and the contents.
- `readFile()` — Returns content of file at containing directory/filename.
- `removeFile()` — `del /path/to/file`
- `copyFile()` — Copies a file to a new file.
- `renameFile()` — Renames a file.
- `reinstall()` — Reinstalls Windows Century.

> *'But why can't I just write to system?'*

Listen here, the system is at the real website.
Not the filesystem, not some cool directory...
The website.
Okay?

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

const win = new WindowCreator
win.newText("Hello world")
renderWindow("Foo bar bad baf doo", win.output, 400, 300)
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
