import { WindowCreator,renderWindow } from "/system/ui/ui.js";
import {newFile, splitFilenamePath} from "/system/important/fs.js"
const win = new WindowCreator
win.newText("Set a URL to save as a 'binary' though actually plaintext file. BinaryURL supported apps can use this to use binary with strings.")
const path = win.newInput()
win.newText("Save path?")
const sav = win.newInput()
win.newButton("Save",function(){newFile(splitFilenamePath(sav.value)[1],splitFilenamePath(sav.value)[0],path.value)})
renderWindow("BinaryURL",win.output,400,300)
