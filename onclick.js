function fullOpacity() {
    var element = document.getElementById('id');

    if (element.style.opacity === "1") {
        element.style.opacity = "0.5";
    } else {
        element.style.opacity = "1";
    }
}
document.querySelector("button").addEventListener("click", fullOpacity);