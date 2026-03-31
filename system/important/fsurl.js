import { readFile, splitFilenamePath } from "/system/important/fs.js";

// URL-to-HTTP(S)-or-Blob
export function URLer(url) {
    if (url.startsWith("fs://")) {
        // Strip fs://
        url = url.replace("fs://", "");

        const [filename, path] = splitFilenamePath(url);
        const contents = readFile(path, filename);

        // Wrap contents in an array for Blob()
        const blob = new Blob([contents]);
        return URL.createObjectURL(blob);
    }

    if (url.startsWith("http") || url.startsWith("https") || url.startsWith("/")) {
        return url;
    }

    return "/404.html";
}
