import { WindowCreator,renderWindow } from "../ui/ui.js";
const win = new WindowCreator
var e = win.newFrame("/pur/e.html",undefined,400,300)
function meow() {
    e.width = win.body.clientWidth
    e.height = win.body.clientHeight
    e.on
}
setInterval(meow,10)
renderWindow("Pur on Windows Century",win.output,400,300)
