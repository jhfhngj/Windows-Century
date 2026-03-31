import { readFile } from "../important/fs";
import { newFile } from "/system/important/fs.js";
import { WindowCreator,renderWindow,betterPrompt } from "/system/ui/ui.js";
const win = new WindowCreator
function loadScript(code, callback) {
    try {
        const script = document.createElement('script');
        script.textContent = code;
        script.type = 'module'; // does this hurt no
        script.onload = () => {
            console.log(`Script loaded: ${code}`);
            if (typeof callback === 'function') callback(code);
        };
        script.onerror = () => {
            console.error(`Failed to load script: ${code}`);
        };
        document.head.appendChild(script);
    } catch (err) {
        console.error("Error loading script:", err);
    }
}
win.newText("Settings")
win.newSplit()
win.newButton("Change main package repository",function(){
    betterPrompt("Repo?",function(val){newFile("/","repo",val)})
})
win.newSplit()
win.newButton("Set wallpaper",function(){
    loadScript(readFile("/apps/","Wallpaper Setter.js"))
})
renderWindow("Settings",win.output,400,300)
