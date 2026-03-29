import { renderWindow,WindowCreator } from "/system/ui/ui.js";
const win = new WindowCreator
win.newInput("text")
function choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function respond(text){
    document.getElementById("output").textContent = text;
}

function getInp(){
    return document.getElementById("text").value;
}

function isGreeting(text) {
    text = text.toLowerCase().trim();
    return /^(h[ei]y?|yo|g(ood )?(morning|evening|day)|sup|salut|hola|ciao)/.test(text);
}

function greeting(){
    const greets = ["hi", "hey", "hello", "yo", "sup", "hola", "salut", "ciao"];
    return choice(greets) + ", how are you?";
}

function think(){
    let gah = getInp().toLowerCase().trim();

    // pronoun flip
    gah = gah.replace(/\bi\b/g, "you");

    if (isGreeting(gah)) {
        respond(greeting());
    } else {
        respond("why do you " + gah + "?");
    }
}

win.newButton("Talk to me, CenturyAI, Talk to me!", think)
win.newText("AI output:")
win.newText("","output")
renderWindow("CenturyAI",win.output,800,600)
