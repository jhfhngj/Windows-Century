import { renderWindow, WindowCreator } from "/system/ui/ui.js";

const win = new WindowCreator
win.newWebCode("python")
renderWindow("CodeEdit",win.output,500,500)
