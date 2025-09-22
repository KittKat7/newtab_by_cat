/**
 * @copyright 2025 by KittKat. All rights reserved
 * https://kittkat.xyz
 */

/** Settings for the page */
let settings = {};

/** The default settings */
const DEFAULT_SETTNGS = {
	"user": null,
}

/**
 * Run when page loads
 */
document.addEventListener('DOMContentLoaded', function () {
	// Add event listeners
	document.getElementById("settings-btn").addEventListener("click", toggleSettingsPopup);
	document.getElementById("close-btn").addEventListener("click", toggleSettingsPopup);
	document.getElementById("reset-btn").addEventListener("click", resetSettings);
	document.getElementById("save-btn").addEventListener("click", saveSettings);
	// Run functions
	updateTime();
	loadSettings();
});

/**
 * Updates the time displayed on the clock on the new tab page.
 */
function updateTime() {
	// Get the time and clock element variables
	const time = new Date();
	const clock = document.getElementById("clock");

	// Get the time variables
	let hours = String(time.getHours()).padStart(2, "0");
	let minutes = String(time.getMinutes()).padStart(2, "0");

	// Update the displayed time
	clock.textContent = hours + ":" + minutes;

	// Set a callback for 5 seconds
	setTimeout(updateTime, 5000);
}

/**
 * Loads the settings from localStorage or from DEFAULT_SETTINGS and applies the
 * settings
 */
function loadSettings() {
	let settingsStr = localStorage.getItem("settings");
	settings = settingsStr === null ? DEFAULT_SETTNGS : JSON.parse(settingsStr);

	document.getElementById("user").textContent = settings["user"] ? ` ${settings["user"]}` : "";
	document.getElementById("user-inp").value = settings["user"] ?? "";
}

/**
 * Saves the settings from the settings inputs to localStorage and the loads the
 * settings to apply them
 */
function saveSettings() {
	settings = {
		"user": document.getElementById("user-inp").value,
	}

	localStorage.setItem("settings", JSON.stringify(settings));
	loadSettings();
}

/**
 * Resets the settings in local storages and loads from DEFAULT_SETTINGS
 */
function resetSettings() {
	localStorage.removeItem("settings");
	loadSettings();
}

/**
 * Toggles the settings menu
 */
function toggleSettingsPopup() {
	const popup = document.getElementById("settings-popup");
	// Toggle hidden class
	if (popup.classList.contains("hidden"))
		popup.classList.remove("hidden")
	else
		popup.classList.add("hidden")
}