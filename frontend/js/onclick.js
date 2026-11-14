// Everything to do with the achievement popup.
// The popup is a <dialog> element in index.html. The browser gives <dialog> a lot for free:
// - showModal() puts it on top of the page and dims everything behind it (the "backdrop")
// - the page behind can't be clicked while it's open
// - pressing the Escape key closes it
var popup = document.querySelector(".popup");
var popupImage = popup.querySelector(".popup-image");
var popupName = popup.querySelector(".popup-name");
var popupDescription = popup.querySelector(".popup-description");
var popupTip = popup.querySelector(".popup-tip");
var popupReward = popup.querySelector(".popup-reward");
var completeButton = popup.querySelector(".popup-complete");
var closeButton = popup.querySelector(".popup-close");

var gridButtons = document.querySelectorAll(".grid button");
var openButton = null; // the grid button whose popup is currently showing

// Make the Complete button match whether the open achievement is done or not.
function showCompletedState() {
    var isCompleted = openButton.classList.contains("completed");
    completeButton.textContent = isCompleted ? "Completed" : "Complete";
    completeButton.setAttribute("aria-pressed", isCompleted);
}

// Fill the popup with one achievement's details, then show it.
function openPopup(event) {
    openButton = event.currentTarget;
    var index = Array.prototype.indexOf.call(gridButtons, openButton);
    var achievement = achievements[index]; // defined in achievements.js

    popupImage.src = openButton.querySelector("img").src;
    popupName.textContent = achievement.name;
    popupDescription.textContent = achievement.description;
    popupTip.textContent = achievement.tip || "Tip coming soon.";
    popupReward.textContent = achievement.reward
        ? "Reward: " + achievement.reward
        : "No reward";
    showCompletedState();

    popup.showModal();
    // The browser would normally focus the first button inside (the X), which draws
    // an outline around it. Focusing the box itself avoids that, and the Tab key
    // still moves to the X and Complete buttons.
    popup.focus();
}

// Mark the open achievement as done, or undo it if it's already done.
function toggleCompleted() {
    openButton.classList.toggle("completed");
    showCompletedState();
    updateProgress(); // defined in progress.js
}

gridButtons.forEach(function (button) {
    button.addEventListener("click", openPopup);
});

completeButton.addEventListener("click", toggleCompleted);

closeButton.addEventListener("click", function () {
    popup.close();
});

// Close the popup when someone clicks the dimmed area around it.
// A click on the backdrop counts as a click on the <dialog> itself, while a click
// inside the box lands on .popup-content (or something in it). So if the thing
// clicked is the <dialog> itself, the click was outside the box.
popup.addEventListener("click", function (event) {
    if (event.target === popup) {
        popup.close();
    }
});
