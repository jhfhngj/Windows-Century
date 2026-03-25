import { WindowCreator, renderWindow, renderBackground } from "/system/ui/ui.js"
var bodyDiv = new WindowCreator
bodyDiv.newButton("This image is not beautiful", function(){document.getElementById("image").remove();document.getElementById("image2").remove()},"doom")
bodyDiv.newText("Or is it?","")
bodyDiv.newImage("https://th.bing.com/th/id/OIP._2K-QIG2KFVN-e8SFeVbdQHaE8?w=234&h=180&c=7&r=0&o=7&pid=1.7&rm=3","image2")
bodyDiv.newFrame("https://th.bing.com/th/id/OIP._2K-QIG2KFVN-e8SFeVbdQHaE8?w=234&h=180&c=7&r=0&o=7&pid=1.7&rm=3","image")
bodyDiv = bodyDiv.output

renderWindow("Beautiful images", bodyDiv, 400, 600);
renderBackground("/system/bg.png")