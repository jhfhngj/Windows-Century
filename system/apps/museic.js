import { readFile, splitFilenamePath } from "/system/important/fs.js";
import { renderWindow, WindowCreator } from "/system/ui/ui.js";

const win = new WindowCreator
win.newText("Music Player\nEnter path below")

const input = win.newInput()
const canvas = win.newCanvas()

win.newButton("Play", function() {

    const path = input.value
    const [file, folder] = splitFilenamePath(path)

    const audio = document.createElement("audio")
    audio.src = "data:audio/mp3;base64,"+readFile(file, folder)
    document.body.appendChild(audio)

    const ctx = canvas.getContext("2d")
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const analyser = audioCtx.createAnalyser()
    const source = audioCtx.createMediaElementSource(audio)

    source.connect(analyser)
    analyser.connect(audioCtx.destination)

    analyser.fftSize = 256
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    function draw() {
        requestAnimationFrame(draw)
        analyser.getByteFrequencyData(dataArray)

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const barWidth = (canvas.width / bufferLength) * 2.5
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
            const barHeight = dataArray[i]
            ctx.fillStyle = `rgb(${barHeight + 100}, 50, 150)`
            ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2)
            x += barWidth + 1
        }
    }

    audio.play().then(() => {
        audioCtx.resume()
        draw()
    })
})

renderWindow("MusicListen", win.output, 500, 500)
