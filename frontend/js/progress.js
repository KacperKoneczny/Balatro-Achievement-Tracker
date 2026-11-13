// Everything to do with the progress bar at the top of the page.
var progressBar = document.querySelector(".progress");
var progressFill = document.querySelector(".progress-fill");
var progressText = document.querySelector(".progress-text");

// Work out how many achievements are done and update the bar to match.
function updateProgress() {
    var total = document.querySelectorAll(".grid button").length;
    var completed = document.querySelectorAll(".grid button.completed").length;
    var percent = Math.round((completed / total) * 100);
    progressFill.style.width = percent + "%";
    progressText.textContent = percent + "%";
    // Tells screen readers the new value.
    progressBar.setAttribute("aria-valuenow", percent);
}

updateProgress();
