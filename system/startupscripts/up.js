import { betterAlert } from "/system/ui/ui.js"
import { freshFS, readFile, splitFilenamePath } from "/system/important/fs.js"
if (parseFloat(freshFS()["/"]["CenturyFS"])>parseFloat(readFile(splitFilenamePath("/CenturyFS")[1],splitFilenamePath("/CenturyFS")[0]))) {
    betterAlert("A CenturyFS update is available! If you want newer apps, use the App Update Center or reinstall Windows Century.")
}
