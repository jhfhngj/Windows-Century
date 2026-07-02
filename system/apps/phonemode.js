import { newFile } from "../important/fs"
import { WindowCreator, renderWindow } from "../ui/ui"
const win = new WindowCreator
win.newText("There is **no way** to switch back, except restarting Windows Century.\nPhone Mode is in **alpha** and may have bugs.\nAre you still sure?\n")
win.newButton("Y  e  s",function(){
    car.textContent += "Starting transformation..."
    car.textContent += "\nResize start menu"
    var menu = document.getElementById("0x001929FEFF")
    menu.style.width = window.innerWidth + "px"
    menu.style.height = window.innerHeight + "px"
    car.textContent += "\nRemove window"
    setInterval(win.remove(),2000)
})
const car = win.newText("debug log:\n")
renderWindow("Are you sure?", win.output,100,100,"/system/cool photos/phonemode.png")