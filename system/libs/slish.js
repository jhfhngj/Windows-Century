// Slish.js
// Glob? No
// Slish
// Globbing? No
// Slishing

function match(pattern) {
    const tokens = [];
    let buffer = "";

    for (const ch of pattern) {
        if (ch === "*") {
            if (buffer) tokens.push(buffer), buffer = "";
            tokens.push("catchall");
        } else if (ch === "!") {
            if (buffer) tokens.push(buffer), buffer = "";
            tokens.push("not");
        } else if (ch === "?") {
            if (buffer) tokens.push(buffer), buffer = "";
            tokens.push("one");
        } else if (ch === "#") {
            if (buffer) tokens.push(buffer), buffer = "";
            tokens.push("digitsonly");
        } else if (ch === "^") {
            if (buffer) tokens.push(buffer), buffer = "";
            tokens.push("lettersonly");
        } else {
            buffer += ch;
        }
    }

    if (buffer) tokens.push(buffer);

    return tokens;
}

function doit(tokens) {
    let out = "";
    for (const t of tokens) {
        if (t === "catchall") out += "*";
        else if (t === "not") out += "!";
        else if (t === "one") out += "?";
        else if (t === "digitsonly") out += "[0-9]";
        else if (t === "lettersonly") out += "[A-Za-z]";
        else out += t;
    }
    return out;
}

function globToRegex(glob) {
    let out = "^";
    let i = 0;

    while (i < glob.length) {
        const ch = glob[i];

        if (ch === "*") {
            if (glob[i+1] === "*") {
                out += ".*";
                i += 2;
            } else {
                out += "[^/]*";
                i++;
            }
        }

        else if (ch === "?") {
            out += ".";
            i++;
        }

        else if (ch === "[") {
            let cls = "";
            i++;
            while (glob[i] !== "]") cls += glob[i++];
            i++;
            out += "[" + cls + "]";
        }

        else {
            if ("\\.[]{}()+-^$|".includes(ch)) out += "\\";
            out += ch;
            i++;
        }
    }

    out += "$";
    return new RegExp(out);
}

export function slish(pattern, text) {
    const tokens = match(pattern);
    const glob = doit(tokens);

    if (glob.startsWith("!")) {
        return !globToRegex(glob.slice(1)).test(text);
    }

    return globToRegex(glob).test(text);
}
