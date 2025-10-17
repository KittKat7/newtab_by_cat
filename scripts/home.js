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

	const searchForm = document.getElementById("search");
	if (searchForm) {
		searchForm.parentElement.classList.remove("hidden");
		searchForm.addEventListener("submit", search);
		searchForm.focus();
	}

	specialDates();
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
	let hours = time.getHours();
	let hoursStr = String(hours).padStart(2, "0");
	let minutes = String(time.getMinutes()).padStart(2, "0");

	// Update the displayed time
	clock.textContent = hoursStr + ":" + minutes;

	// Set a callback for 5 seconds
	setTimeout(updateTime, (60 - time.getSeconds()) * 1000);

	let timeGreeting = "Hello";
	if (_isMorning(hours)) timeGreeting = "Good morning";
	else if (_isAfternoon(hours)) timeGreeting = "Good afternoon";
	else if (_isEvening(hours)) timeGreeting = "Good evening";
	else if (_isNight(hours)) timeGreeting = "Good night";

	document.getElementById("greeting").innerText = timeGreeting;
}

function _isMorning(hours) { return hours >= 6 && hours < 12; }
function _isAfternoon(hours) { return hours >= 12 && hours < 17; }
function _isEvening(hours) { return hours >= 17 && hours < 19; }
function _isNight(hours) { return hours >= 19 || (hours <= 0 && hours > 6); }

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


function specialDates() {
	const today = new Date();
	// Is halloween
	if (today.getMonth() === 9 && today.getDate() === 31) {
		const style = document.createElement("style");
		style.innerText = `:root { --primary: #fd7708; --accent: #FF9A00; }`;
		document.head.appendChild(style);
	}
}

function search(event) {
	event.preventDefault();

	const browserType = detectBrowser();
	const q = event.target.searchq.value;

	if (typeof chrome !== 'undefined'
		&& typeof chrome.search !== 'undefined'
	) {
		chrome.search.query({ text: q }, function () {
			if (chrome.runtime.lastError) {
				console.error("Search error: ", chrome.runtime.lastError);
			}
		});
	} else if (typeof browser !== 'undefined'
		&& typeof browser.search !== 'undefined'
	) {
		browser.search.query({ text: q }, function () {
			if (browser.runtime.lastError) {
				console.error("Search error: ", browser.runtime.lastError);
			}
		});
	} else {
		// Encode the query to ensure proper URL formatting
		const encodedQuery = encodeURIComponent(q);

		// Construct the DuckDuckGo search URL
		const url = `https://duckduckgo.com/?q=${encodedQuery}`;

		// Redirect the current tab to the search URL
		window.location.href = url;
	}

	// TODO Add fallback for not extension
}

