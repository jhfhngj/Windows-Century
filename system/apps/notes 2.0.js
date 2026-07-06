import { WindowCreator,renderWindow } from '/system/ui/ui.js'
import { splitFilenamePath, newFile } from '/system/important/fs.js'

var win = new WindowCreator

var myCodeMirror = win.newTextArea("notes")

win.newText("File path?")
var fp = win.newInput()
win.newButton("Save to path", function(){
    newFile(splitFilenamePath(fp.value)[1],splitFilenamePath(fp.value)[0],myCodeMirror.value)
})

renderWindow("Notes 2.0",win.output,500,500)
