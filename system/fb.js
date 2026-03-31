import { WindowCreator,renderWindow } from "/system/ui/ui.js"
import { readFile,newFile } from "/system/important/fs.js"
var string = `Windows Century comes with ABSOLUTELY NO WARRANTY, to the extent permitted by applicable law.
Translation: 'What's a warranty?' - Windows Century
Windows Century listens for keyboard input during startup only to detect the Alt+P Recovery Mode shortcut. 
No keystrokes are saved or transmitted.
`
if (readFile("/","firstboot") == "1") {
var win = new WindowCreator
abc = win.newDiv()
abc.textContent = string
abc.style.whiteSpace = "pre-wrap"
newFile("/","firstboot","0")
renderWindow("Warranty & Keystroke Notice",win.output,500,200)
}
