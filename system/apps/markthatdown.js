import { readFile, splitFilenamePath } from "/system/important/fs.js";
import { WindowCreator,renderWindow } from "/system/ui/ui.js";
import { marked } from "/system/libs/marked.esm.js"

const win = new WindowCreator
win.newText("MarkThatDown (Uses Marked)")
win.newText("To open")
const a=win.newInput()
win.newButton("Open!",function(){
    ca.innerHTML = marked.parse(readFile(splitFilenamePath(a.value)[1],splitFilenamePath(a.value)[0]))
})
const ca = win.newDiv()
renderWindow("MarkThatDown (Uses Marked)",win.output,400,300)
