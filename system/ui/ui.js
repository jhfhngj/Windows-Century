import { WebCode } from "/system/libs/webcode.js"
import { URLer } from "/system/important/fsurl.js";
function addMiniDIV(minidiv) {
    document.body.appendChild(minidiv);
}
export class WindowCreator
{
    constructor() {
        this.body = document.createElement("div")
    }
    newImage(url,id){
        var image = document.createElement("img")
        image.id = id
        image.src = url
        this.body.appendChild(image)
        return image
    }
    newText(text,id){
        var textt = document.createElement("p")
        textt.id = id
        textt.textContent = text
        this.body.appendChild(textt)
        return textt
    }
    newButton(text,action,id){
        var btn = document.createElement("button")
        btn.textContent = text
        btn.onclick = action
        btn.id = id
        btn.className = "win95-button"
        this.body.appendChild(btn)
        return btn
    }
    get output() {
        return this.body
    }
    newFrame(url,id, width,height){
        if (!width){width=300}
        if (!height){height=300}
        var frm = document.createElement("iframe")
        frm.src = url
        frm.id = id
        frm.style.height = height
        frm.style.width = width
        frm.style.display = "flex"
        this.body.appendChild(frm)
        return frm
    }
    newInput(id){
        var ipt = document.createElement("input")
        ipt.id = id
        this.body.appendChild(ipt)
        return ipt
    }
    newDiv(id){
        var ipt = document.createElement("div")
        ipt.id = id
        this.body.appendChild(ipt)
        return ipt
    }
    newTextArea(id) {
        var ta = document.createElement("textarea")
        ta.id=id
        this.body.appendChild(ta)
        return ta
    }
    remove() {
        this.body.remove()
    }
    newSplit(){
        var sp = document.createElement("hr")
        this.body.appendChild(sp)
        return sp
    }
    newWebCode(language,id){
        var sp = new WebCode(language)
        sp.id = id
        this.body.appendChild(sp.element)
        return sp
    }
    newCanvas(id){
        var sp = document.createElement("canvas")
        sp.id = id
        this.body.appendChild(sp)
        return sp
    }
}

function dragElement(elmnt,elmnt2) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (!document.getElementById(elmnt2.id)) {
    // if present, the header is where you move the DIV from:
    elmnt2.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

export function betterAlert(text) {
    const win = new WindowCreator
    win.newText(text)
    renderWindow("Message",win.body,300,300)
}
export function betterPrompt(text, callback) {
    const win = new WindowCreator()
    win.newText(text)
    const input = win.newInput()

    win.newButton("OK", () => {
        callback(input.value)
        win.remove()
    })

    renderWindow("Prompt", win.body, 300, 300)
}

var focused = null

export function renderWindow(title, bodyy, width, height, icon) {
    var windw = document.createElement("div");
    windw.className = "window";
    windw.style.display = "flex";
    windw.style.flexDirection = "column";
    focused = windw

    // Actual titlebar
    var bar = document.createElement("div")
    var car = document.createElement("div")
    if (icon) {
        var toPut = document.createElement("img")
        toPut.src = URLer(icon)
        toPut.width = 32
        toPut.height = 32
        car.appendChild(toPut)
    }

    // Title bar
    var titlebar = document.createElement("div");
    titlebar.className = "titlebar";

    // FIX: use flex instead of absolute positioning
    titlebar.style.display = "flex";
    titlebar.style.alignItems = "center";
    titlebar.style.justifyContent = "space-between";
    titlebar.style.padding = "0 10px";

    var titleEl = document.createElement("div");
    titleEl.textContent = title;

    var remSelf = document.createElement("button");
    remSelf.className = "win95-button"
    remSelf.textContent = "X";
    remSelf.style.color = "#000"
    remSelf.onclick = function () {
        windw.remove();
    };

    titlebar.appendChild(titleEl);
    titlebar.appendChild(remSelf);
    car.appendChild(titlebar)
    bar.appendChild(car)
    windw.appendChild(bar);

    // Body content
    bodyy.style.flex = "1";          // <-- THIS makes the body fill the window
    bodyy.style.padding = "0";       // optional, prevents shrinking
    bodyy.style.overflow = "hidden"; // keeps iframe clean
    windw.appendChild(bodyy);

    // Size
    windw.style.width = width + "px";
    windw.style.height = height + "px";

    // Border
    windw.style.border = "1px solid black"
    dragElement(windw,titlebar)
    addMiniDIV(windw);
    windw.id = "window-" + title.replace(/[^a-zA-Z0-9_-]/g, "-");
    windw.onclick = function(){
        focused = windw
    }
    windw.ondrag = function(){
        focused = windw
    }
    windw.onmousedown = function(){
        focused = windw
    }
    setInterval(function(){
        if (focused != windw) {
            windw.style.zIndex = -10
            titlebar.className = "unfocused"
        } else {
            windw.style.zIndex = 30
            titlebar.className = "titlebar"
        }
    },100)
}
export function renderBackground(url) {
    const bg = document.createElement("img");
    bg.src = url;

    bg.style.position = "fixed";
    bg.style.top = "0";
    bg.style.left = "0";
    bg.style.width = "100vw";
    bg.style.height = "100vh";
    bg.style.objectFit = "fill"; // now this works
    bg.style.zIndex = "-1234567890";
    bg.style.pointerEvents = "none";
    bg.draggable = false

    document.body.style.margin = "0";
    document.body.appendChild(bg);
}
