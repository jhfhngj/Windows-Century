import { newFile } from "/system/important/fs.js"
import { WindowCreator, renderWindow } from "/system/ui/ui.js"
const win = new WindowCreator
win.newText("There is **no way** to switch back, except restarting Windows Century.\nPhone Mode is in **beta** and has many bugs.\nAre you still sure?\n")
win.newButton("Y  e  s",function(){
    car.textContent += "Starting transformation..."
    car.textContent += "\nResize start menu"
    var menu = document.getElementById("0x001929FEFF")
    menu.style.width = window.innerWidth + "px"
    menu.style.height = (window.innerHeight-0) + "px"
    car.textContent += "\nMenu Yes."
    menu.style.opacity = "1"
    menu.style.pointerEvents = "all"
    car.textContent += "\nRemove taskbar"
    document.getElementById("taskbar").remove()
    car.textContent += "\nRemove window"
    setInterval(win.remove,2000)
})
const car = win.newText("debug log:\n")
renderWindow("Are you sure?", win.output,100,100,"/system/cool photos/phonemode.png")