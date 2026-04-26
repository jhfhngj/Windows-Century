import { WindowCreator,renderWindow } from "/system/ui/ui.js";
const win = new WindowCreator
async function testLocalStorageSafe() {
    let i = 0;
    try {
        while (true) {
            localStorage.setItem(i.toString(), "a");
            i++;

            // Let the OS breathe every 500 writes
            if (i % 500 === 0) {
                await new Promise(r => setTimeout(r));
            }
        }
    } catch {
        const max = i;
        const leng = localStorage.length;
        localStorage.clear();
        return [max, leng];
    }
}
function addtorial(maxKeys) {
    let charCount = 0;

    for (let i = 0; i < maxKeys; i++) {
        charCount += i.toString().length; // key length
        charCount += 1; // value "a"
    }

    return charCount * 2; // UTF-16 bytes
}
win.newText("localStorage Tester - Hit button below to test localStorage! (Opera users, heard that localStorage on there has no limit, please don't, I don't want you having no more disk space cause of me...)")
win.newText("Your Windows Century may freeze, but that just means it is testing.")
win.newButton("Test!",async function(){
    var res = await testLocalStorageSafe()
    a.innerText = `Your localStorage supports having ${addtorial(res[1])} bytes total, with the localStorage length/maximum number being ${addtorial(res[1])/res[0]}. If this is >= 1, then your localStorage is good.
    Or if you don't know what a byte is let's just say you can store ${addtorial(res[1])/8951808} Windows 3.1 ISOs.`
})
win.newText("Output:")
const a = win.newDiv()
renderWindow("localStorage Tester",win.output,400,300)
