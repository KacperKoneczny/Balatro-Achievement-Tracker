// Remembers which achievements are completed, so they stay checked after a reload.
// It uses localStorage: a small storage space the browser keeps for each website.
// - It only holds text, so the list of completed achievements is turned into JSON text
//   (JSON.stringify) when saving, and back into a list (JSON.parse) when loading.
// - Saved data stays in this browser on this device. Another browser or device
//   starts empty, and clearing the browser's site data erases it.
// Achievements are saved by name rather than by position, so reordering the grid
// later won't mix up which ones are done.
var STORAGE_KEY = "balatro-tracker-completed";

// Read the saved list of completed achievement names.
// Returns an empty list if nothing is saved yet, the data is broken, or the browser
// blocks storage (some private browsing modes do). The try/catch stops any of those
// from crashing the page.
function loadCompleted() {
    try {
        var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return Array.isArray(saved) ? saved : [];
    } catch (error) {
        return [];
    }
}

// Save the names of every achievement that is currently marked completed.
function saveCompleted() {
    var names = [];
    document.querySelectorAll(".grid button").forEach(function (button, index) {
        if (button.classList.contains("completed")) {
            names.push(achievements[index].name); // defined in achievements.js
        }
    });
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
    } catch (error) {
        // Storage is blocked or full. The page still works, it just won't remember.
    }
}

// When the page loads, mark the saved achievements as completed again.
function restoreCompleted() {
    var saved = loadCompleted();
    document.querySelectorAll(".grid button").forEach(function (button, index) {
        if (saved.indexOf(achievements[index].name) !== -1) {
            button.classList.add("completed");
        }
    });
    updateProgress(); // defined in progress.js
}

restoreCompleted();
