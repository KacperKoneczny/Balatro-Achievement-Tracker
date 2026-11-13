// Switch an achievement between "not done" and "done" when it's clicked.
function toggleCompleted(event) {
    var button = event.currentTarget;
    var isCompleted = button.classList.toggle("completed");
    button.setAttribute("aria-pressed", isCompleted);
}

// Attach the click handler to every achievement button in the grid.
var buttons = document.querySelectorAll(".grid button");
buttons.forEach(function (button) {
    button.addEventListener("click", toggleCompleted);
});
