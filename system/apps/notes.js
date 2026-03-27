import { WindowCreator, renderWindow } from "../ui/ui";
import { newFile } from "../important/fs";
let myWin = new WindowCreator
myWin.newInput("txt")
myWin.newText("Save to... (Filename only plz)", "")
myWin.newInput("sve")
myWin.newButton("Save", function(){newFile("/notepad/",document.getElementById("sve").value,document.getElementById("txt").value)},"btn")
renderWindow(myWin.output)
