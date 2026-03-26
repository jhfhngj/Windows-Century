// ------------------------------
// FS ROOT
// ------------------------------
function freshFS() {
    return { "/": {} };
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

// ------------------------------
// INITIALIZE FS
// ------------------------------
console.log("fs.js loaded");
console.log("fs.js is currently reloading or creating Windows97 disk...");

fs = await loadFS(); // IMPORTANT FIX
