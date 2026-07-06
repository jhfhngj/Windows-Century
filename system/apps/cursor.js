function createCursor() {
    var cursor = document.createElement("img");
    cursor.src = "/system/cool photos/cursor.png";
    cursor.style.position = "absolute";
    cursor.style.left = "0px";
    cursor.style.top = "0px";

    cursor.moveTo = function(element, callback) {
        cursor.selected = element;
        cursor.style.left = element.offsetLeft + "px";
        cursor.style.top = element.offsetTop + "px";
        if (callback) setTimeout(callback, 500);
    };

    cursor.click = function() {
        if (cursor.selected) {
            cursor.selected.click();
            cursor.selected.focus()
        }
    };

    cursor.type = function(text) {
        if (!cursor.selected) return;

        if ("value" in cursor.selected) {
            cursor.selected.value += text;
        } else {
            cursor.selected.textContent += text;
        }
    };

    document.body.appendChild(cursor);
    return cursor;
}

var cursor = createCursor();

cursor.moveTo(document.getElementById("start-button"), function() {
    cursor.click();

    cursor.moveTo(document.getElementById("app-Notes-2-0-js"), function() {
        cursor.click();
        cursor.moveTo(document.getElementById("notes"), function() {
            cursor.click();
            cursor.type("THis is a CUrsor doing NOt a Single Job for you!");
        });
    });
});
