import { WindowCreator, renderWindow } from "/system/ui/ui.js";

const win = new WindowCreator();

function choice(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function range(start, end) {
    if (end === undefined) {
        end = start;
        start = 0;
    }
    return Array.from({ length: end - start }, (_, i) => start + i);
}

let text = "";
const chars = range(32, 126).map(c => String.fromCodePoint(c));

for (let i = 0; i < 120; i++) {
    text += choice(chars);
}

win.newText("The Windows Century Times");
win.newText(text);

renderWindow("win", win.output, 400, 300);
