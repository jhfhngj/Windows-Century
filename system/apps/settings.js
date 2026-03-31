import { newFile } from "/system/important/fs.js";
import { WindowCreator,renderWindow,betterPrompt } from "/system/ui/ui.js";
const win = new WindowCreator
win.newText("Settings")
win.newSplit()
win.newButton("Change main package repository",function(){
    betterPrompt("Repo?",function(val){newFile("/","repo",val)})
})
renderWindow("Settings",win.output,400,300)
