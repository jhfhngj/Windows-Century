// System97
const FIRST = 97;   // " "
const LAST  = 122;  // "Z"
const ILLEGAL = new Set(['\\','/',':','|','<','>','"','*','?']);

function nextPrintable(str) {
    
    if (str === "") return String.fromCharCode(FIRST);

    let arr = str.split("");
    let i = arr.length - 1;

    while (i >= 0) {
        let code = arr[i].charCodeAt(0);

        while (code < LAST) {
            code++;
            const next = String.fromCharCode(code);
            if (!ILLEGAL.has(next)) {
                arr[i] = next;
                return arr.join("");
            }
        }

        // rollover
        const first = String.fromCharCode(FIRST);
        if (!ILLEGAL.has(first)) {
            arr[i] = first;
        }
        i--;
    }

    return String(String.fromCharCode(FIRST) + arr.join("")).toLowerCase();
}

// Example body is in sa.js
// Do the startup scripts
let load1 = document.createElement("p")
load1.textContent = "Loading startup scripts..."
let pb95 = document.createElement("progress")
pb95.value = 0
pb95.max = 25**1+25**2
pb95.style.width = '1000px'
document.body.appendChild(load1)
document.body.appendChild(pb95)
let current = "";
function loadScript(url, callback) {
    try {
        const script = document.createElement('script');
        script.src = url;
        script.type = 'module'; // does this hurt no
        script.onload = () => {
            console.log(`Script loaded: ${url}`);
            if (typeof callback === 'function') callback(url);
        };
        script.onerror = () => {
            console.error(`Failed to load script: ${url}`);
        };
        document.head.appendChild(script);
    } catch (err) {
        console.error("Error loading script:", err);
    }
}
var finished = false
function tick(inputFunction) {
    var does = []
    current = nextPrintable(current, function(url){does.push(url)});
    console.log(current);
    var aCr = "/system/startupscripts/"+current+".js"
    console.log("Testing for",aCr+"...")
    try {
        loadScript(aCr)
    } catch {}
    pb95.value = pb95.value + 1
    if (current.length <= 2) {
    setTimeout(tick, 5);
    } else {
        load1.remove()
        pb95.remove()
        finished = true
        console.clear()
        inputFunction()
        
    }
    console.log("Got files",does)
    document.body.append(does.join(".js, and "))
}

tick(function(){
    loadScript("/system/ui/taskbar.js")
    
});
//while (!finished);
