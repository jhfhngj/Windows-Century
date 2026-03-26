// Taskbar
var tb = document.createElement("div")
tb.id = "taskbar"
var sb = document.createElement("button")
sb.id = "start-button"
var tx = document.createElement("span")
tx.textContent = "Start"
var ic = document.createElement("img")
ic.src = "/w97.png"
ic.width = "16"
ic.height = "16"
sb.appendChild(ic)
sb.appendChild(tx)
tb.appendChild(sb)
var clock = document.createElement("div")
clock.textContent = ""
clock.id = "taskbar-clock"
tb.appendChild(clock)
document.body.appendChild(tb)
setInterval(() => {
    document.getElementById("taskbar-clock").textContent =
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}, 1000);
