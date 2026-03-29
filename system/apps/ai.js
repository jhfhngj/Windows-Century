import { renderWindow,WindowCreator } from "/system/ui/ui.js";
const win = new WindowCreator
win.newInput("text")
function choice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function expandClass(cls) {
    const chars = [];
    for (let i = 0; i < cls.length; i++) {
        if (cls[i+1] === '-' && cls[i+2]) {
            const start = cls.charCodeAt(i);
            const end = cls.charCodeAt(i+2);
            for (let c = start; c <= end; c++) chars.push(String.fromCharCode(c));
            i += 2;
        } else {
            chars.push(cls[i]);
        }
    }
    return chars;
}

function generateFromRegex(regex) {
    let i = 0;

    function parse() {
        let out = "";

        while (i < regex.length) {
            const ch = regex[i];

            if (ch === '[') {
                // character class
                i++;
                let cls = "";
                while (regex[i] !== ']') cls += regex[i++];
                i++; // skip ]
                const chars = expandClass(cls);
                out += choice(chars);
            }

            else if (ch === '(') {
                // group
                i++;
                let group = "";
                let depth = 1;
                while (depth > 0) {
                    if (regex[i] === '(') depth++;
                    if (regex[i] === ')') depth--;
                    if (depth > 0) group += regex[i];
                    i++;
                }
                out += generateFromRegex(group);
            }

            else if (ch === '|') {
                // alternation: pick left or right
                i++;
                const right = generateFromRegex(regex.slice(i));
                return Math.random() < 0.5 ? out : right;
            }

            else if (ch === '{') {
                // quantifier
                i++;
                let num = "";
                while (regex[i] !== '}') num += regex[i++];
                i++; // skip }
                const [min, max] = num.split(',').map(Number);
                const count = max ? (min + Math.floor(Math.random() * (max - min + 1))) : min;
                const last = out[out.length - 1];
                out = out.slice(0, -1) + last.repeat(count);
            }

            else if (ch === '+') {
                i++;
                const last = out[out.length - 1];
                out += last.repeat(1 + Math.floor(Math.random() * 3));
            }

            else if (ch === '*') {
                i++;
                const last = out[out.length - 1];
                out += last.repeat(Math.floor(Math.random() * 4));
            }

            else if (ch === '?') {
                i++;
                const last = out[out.length - 1];
                if (Math.random() < 0.5) out = out.slice(0, -1);
            }

            else {
                // literal character
                out += ch;
                i++;
            }
        }

        return out;
    }

    return parse();
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
