import { WindowCreator, renderWindow } from "/system/ui/ui.js";
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
