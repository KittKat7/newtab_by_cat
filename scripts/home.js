/**
 * @copyright 2025 by KittKat. All rights reserved
 * https://kittkat.xyz
 */

/**
 * Run when page loads
 */
(main => {
	// Add event listeners
	document.getElementById("settings-btn").addEventListener("click", toggleSettingsPopup);
	document.getElementById("close-btn").addEventListener("click", toggleSettingsPopup);
	document.getElementById("reset-btn").addEventListener("click", resetSettings);
	document.getElementById("save-btn").addEventListener("click", saveSettings);
	// Run functions
	updateTime();
	loadSettings();
})();

/**
 * Loads the settings from localStorage or from DEFAULT_SETTINGS and applies the
 * settings
 */
function loadSettings() {
	const settings = getAllSettings();
	console.log(settings);

	document.getElementById("user").textContent = settings["user"] ? ` ${settings["user"]}` : "";
	document.getElementById("user-inp").value = settings["user"] ?? "";

	document.getElementById("egg-inp").checked = settings["egg"] === "active" ? true : false;
}

/**
 * Saves the settings from the settings inputs to localStorage and the loads the
 * settings to apply them
 */
function saveSettings() {
	const settings = {
		"user": document.getElementById("user-inp").value,
	}

	if (getSetting("egg") !== null) {
		settings["egg"] = document.querySelector("#egg-inp").checked ? "active" : "found";
	}

	setSettings(settings);
	loadSettings();
}

/**
 * Resets the settings by clearing and then loading
 */
function resetSettings() {
	clearSettings();
	loadSettings();
}

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
	setTimeout(updateTime, (60 - time.getSeconds()) * 1000);
}

/**
 * Toggles the settings menu
 */
function toggleSettingsPopup() {
	const popup = document.getElementById("settings-popup");

	// Easter egg
	const eggInp = document.querySelector("#egg-inp");
	const eggInpLabel = document.querySelector("#egg-inp-lbl");
	const eggInpNote = document.querySelector("#egg-inp-note");
	if (getSetting("egg") !== null) {
		eggInp.classList.remove("hidden");
		eggInpLabel.classList.remove("hidden");
		eggInpNote.classList.add("hidden");
	} else {
		eggInp.classList.add("hidden");
		eggInpLabel.classList.add("hidden");
		eggInpNote.classList.remove("hidden");
	}

	// Toggle hidden class
	if (popup.classList.contains("hidden"))
		popup.classList.remove("hidden")
	else
		popup.classList.add("hidden")
}