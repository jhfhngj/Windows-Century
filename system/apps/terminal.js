import { renderWindow, WindowCreator } from "/system/ui/ui.js"
const win = new WindowCreator
var a = win.newTextArea()
a.style.width = 490
a.style.height = 500
var inp = win.newInput()
const log = function(toPrint) { // Replaces console.log for CTerm
    a.value = a.value + toPrint.toString() + "\n"
}
win.newButton("Determine", function(){a.value += eval(inp.value).toString() + "\n"})
renderWindow("CTerm",win.output,500,600)