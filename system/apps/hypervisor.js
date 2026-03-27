import { WindowCreator,renderWindow } from "/system/ui/ui.js";
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
renderWindow("Turbo-V",win.output,800,600)
