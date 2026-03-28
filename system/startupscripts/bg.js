import { renderBackground } from "/system/ui/ui.js"
import { readFile } from "/system/important/fs.js"

const bgtype = readFile("/", "bgtype");
const bg = readFile("/", "bg");

if (bgtype === "system") {
    // Load from actual URL
    renderBackground(bg);
} else {
    // Load from filesystem (but bg is already the full path)
    renderBackground(bg);
}
