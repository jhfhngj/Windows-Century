import { newFile, readFile, splitFilenamePath } from "/system/important/fs.js";
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
            resolvedURL = `https://cors.eu.org/${resolvedURL}`;
        }

        const res = await fetch(resolvedURL);
        if (!res.ok) throw new Error("HTTP " + res.status);

        const type = res.headers.get("content-type") || "";
        let contents;

        if (type.startsWith("text/") || type.includes("json") || type.includes("xml")) {
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
