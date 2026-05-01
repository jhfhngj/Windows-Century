import { WindowCreator, renderWindow } from "/system/ui/ui.js";
import { URLer } from "/system/important/fsurl.js";
import { readFile, splitFilenamePath } from "/system/important/fs.js";

const win = new WindowCreator();

win.newText("The SWF? (Use web URLs, or fs:// for BinaryURL.)");
const swf = win.newInput();
// Button to load SWF
win.newButton("Play", async function () {
    let path = swf.value;
    let url = URLer(path);

    // If URLer returned a blob URL, we need to fetch the blob
    if (url.startsWith("blob:")) {
        const res = await fetch(url);
        const buf = await res.arrayBuffer();
        const blob = new Blob([buf], { type: "application/x-shockwave-flash" });
        ruf.load(URL.createObjectURL(blob));
        return;
    }

    // If it's a normal URL, let Ruffle fetch it
    ruf.load(url);
});

// Create a container INSIDE the window
const container = win.newDiv();
container.id = "ruffle-container";

// Render the window BEFORE creating the player
renderWindow("Ruffle Player", win.output, 400, 300);

// Now create the Ruffle player
function createRufflePlayer(containerId) {
    const ruffle = window.RufflePlayer.newest();
    const player = ruffle.createPlayer();
    document.getElementById(containerId).appendChild(player);
    return player;
}

const ruf = createRufflePlayer("ruffle-container");