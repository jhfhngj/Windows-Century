let pyre = null;
let stringre = /(['"])(?:\\.|(?!\1).)*\1/g;
let numre = /-?[0-9]+(\.[0-9]+)?([eE][+-]?[0-9]+)?/g;

// Load highlight regex (your giant keyword regex)
fetch("/highlight.re")
    .then(res => res.text())
    .then(text => pyre = new RegExp(text.trim(), "g"));

function setCaretToEnd(el) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}

export class WebCode {
    constructor(language) {
        this.language = language;

        this.element = document.createElement("div");
        this.element.className = "webcode-editor";
        this.element.contentEditable = "true";
        this.element.spellcheck = false;

        this.element.style.whiteSpace = "pre-wrap";
        this.element.style.fontFamily = "monospace";
        this.element.style.background = "#1e1e1e";
        this.element.style.color = "#eee";
        this.element.style.padding = "8px";
        this.element.style.border = "1px solid #333";
        this.element.style.minHeight = "200px";

        this.element.addEventListener("input", () => {
            const raw = this.element.innerText;
            this.renderHighlight(raw);
            setCaretToEnd(this.element);
        });
        // Tab inserts 4 spaces instead of moving focus
        this.element.addEventListener("keydown", (e) => {
            if (e.key === "Tab") {
                e.preventDefault();

                const sel = window.getSelection();
                const range = sel.getRangeAt(0);

                // Insert 4 spaces
                const spaces = document.createTextNode("    ");
                range.insertNode(spaces);

                // Move caret after the spaces
                range.setStartAfter(spaces);
                range.setEndAfter(spaces);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        });
    }

    renderHighlight(text) {
        if (this.language !== "python" || !pyre) {
            this.element.textContent = text;
            return;
        }

        const frag = document.createDocumentFragment();
        let index = 0;

        // Combined regex for strings, numbers, and your highlight.re
        const combined = new RegExp(
            `${stringre.source}|${numre.source}|${pyre.source}`,
            "g"
        );

        let match;
        while ((match = combined.exec(text)) !== null) {
            const start = match.index;
            const end = combined.lastIndex;

            // Add plain text before match
            if (start > index) {
                frag.appendChild(document.createTextNode(text.slice(index, start)));
            }

            const span = document.createElement("span");

            if (match[0].match(stringre)) span.className = "str";
            else if (match[0].match(numre)) span.className = "num";
            else span.className = "kw";

            span.textContent = match[0];
            frag.appendChild(span);

            index = end;
        }

        // Add remaining text
        if (index < text.length) {
            frag.appendChild(document.createTextNode(text.slice(index)));
        }

        this.element.innerHTML = "";
        this.element.appendChild(frag);
    }
}
