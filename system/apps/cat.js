import { WindowCreator,renderWindow } from "/system/ui/ui.js";
const win = new WindowCreator
win.newImage("https://cataas.com/cat","gato")
win.newButton("Cat",function(){document.getElementById("gato").src = `https://cataas.com/cat?t=${Date.now()}`;})
renderWindow("Cat",win.output,400,300)
