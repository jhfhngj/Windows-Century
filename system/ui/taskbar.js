// Taskbar
import { listDir } from "/system/important/fs.js"
var tb = document.createElement("div")
tb.id = "taskbar"

var sb = document.createElement("button")
sb.id = "start-button"

var ic = document.createElement("img")
ic.src = "/w97.png"
ic.width = 16
ic.height = 16
ic.className = "start-icon"

var tx = document.createElement("span")
tx.textContent = "Start"

sb.appendChild(ic)
sb.appendChild(tx)
sb.className = "win95-button"
tb.appendChild(sb)

var clock = document.createElement("div")
clock.id = "taskbar-clock"
var spacer = document.createElement("div")
spacer.style.flex = "1"
spacer.style.height = "24px"
tb.appendChild(spacer)
tb.appendChild(clock)
tb.style.backgroundColor = "#cacaca"
tb.style.color = "#000"
tb.style.position = "absolute"
tb.style.bottom = "0"
tb.style.height = "24px"
tb.style.display = "flex"
tb.style.justifyContent = "space-between"
tb.style.left = "0"
tb.style.right = "0"

setInterval(() => {
    clock.textContent = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    })
}, 1000)

document.body.appendChild(tb)

function loadScript(code, callback) {
    try {
        const script = document.createElement('script');
        script.textContent = code;
        script.type = 'module'; // does this hurt no
        script.onload = () => {
            console.log(`Script loaded: ${code}`);
            if (typeof callback === 'function') callback(code);
        };
        script.onerror = () => {
            console.error(`Failed to load script: ${code}`);
        };
        document.head.appendChild(script);
    } catch (err) {
        console.error("Error loading script:", err);
    }
}

var menu = document.createElement("div")
for (const [filename, code] of listDir("/apps/")) {
    const button = document.createElement("button")
    button.className = "win95-button"
    button.textContent = filename.replace(".js", "")
    button.onclick = function(){loadScript(code)}
    menu.appendChild(button)
}
menu.style.opacity = "0"
menu.style.pointerEvents = "none"
menu.style.position = "absolute"
menu.style.left = "0px"
menu.style.bottom = "24px"   // taskbar height
menu.style.background = "#c0c0c0"
menu.style.border = "2px outset #fff"
menu.style.padding = "4px"
menu.style.display = "flex"
menu.style.flexDirection = "column"

var menuOpen = false
// Add start button listener
sb.onclick = function(){
    // Menu
    menuOpen = !menuOpen
    if (menuOpen) {
        // Show menu
        menu.style.opacity = "1"
        menu.style.pointerEvents = "all"
    } else {
        // Hide menu
        menu.style.opacity = "0"
        menu.style.pointerEvents = "none"
    }
}
document.body.appendChild(menu)
