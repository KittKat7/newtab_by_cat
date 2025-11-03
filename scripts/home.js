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
	qs("#greeting-inp-reset").addEventListener("click", () => {
		qs("#greeting-inp").value = "dynamic";
		saveSettings();
	});
	qs("#settings-form").addEventListener("submit", saveSettings);
	// Run functions
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

	document.getElementById("name").textContent = settings["name"] ? ` ${settings["name"]}` : "";
	document.getElementById("name-inp").value = settings["name"] ?? "";

	qs("#greeting").textContent = settings["greeting"] ? ` ${settings["greeting"]}` : "";
	qs("#greeting-inp").value = settings["greeting"] ?? "";

	qs("#use24Hour-inp").checked = settings.use24Hour;

	if (settings.popupEgg != undefined)
		document.getElementById("popup-egg-inp").checked = settings.popupEgg;
	updateTime();
}

/**
 * Saves the settings from the settings inputs to localStorage and the loads the
 * settings to apply them
 */
function saveSettings(e) {
	if (e) e.preventDefault();

	const settings = {
		"name": document.getElementById("name-inp").value.substring(0, 25),
		"greeting": qs("#greeting-inp").value.substring(0, 25),
		"use24Hour": qs("#use24Hour-inp").checked,
	}

	if (getSetting("popupEgg") !== undefined) {
		settings.popupEgg = qs("#popup-egg-inp").checked;
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
function updateTime(debugTime) {
	// Get the time and clock element variables
	const time = debugTime ? new Date(debugTime) : new Date();
	const clock = document.getElementById("clock");

	// Get the time variables
	let hours = time.getHours();
	let hours12 = hours % 12 === 0 ? 12 : hours % 12;
	let hoursStr = getSetting("use24Hour")
		? String(hours).padStart(2, "0")
		: String(hours12);
	let minutes = String(time.getMinutes()).padStart(2, "0");

	// Update the displayed time
	let timeText = hoursStr + ":" + minutes
	if (!getSetting("use24Hour")) {
		if (hours < 12) timeText += " am";
		else timeText += " pm";
	}
	clock.textContent = timeText;

	// Set a callback for 5 seconds
	setTimeout(updateTime, (60 - time.getSeconds()) * 1000);

	let greeting = getSetting("greeting");

	if (greeting === "dynamic") {
		if (_isMorning(hours)) greeting = "Good morning";
		else if (_isAfternoon(hours)) greeting = "Good afternoon";
		else if (_isEvening(hours)) greeting = "Good evening";
		else if (_isNight(hours)) greeting = "Good night";
	}

	if (getSetting("greeting") !== "dynamic") {
		greeting = getSetting("greeting");
	}

	qs("#greeting").innerText = greeting;
}

function _isMorning(hours) { return hours >= 6 && hours < 12; }
function _isAfternoon(hours) { return hours >= 12 && hours < 17; }
function _isEvening(hours) { return hours >= 17 && hours < 19; }
function _isNight(hours) { return hours >= 19 || (hours <= 0 && hours > 6); }

/**
 * Toggles the settings menu
 */
function toggleSettingsPopup(e) {
	const popup = document.getElementById("settings-popup");

	// Easter egg
	const popupEggInp = document.querySelector("#popup-egg-inp");
	const popupEggInpLabel = document.querySelector("#popup-egg-inp-lbl");
	const popupEggInpNote = document.querySelector("#popup-egg-inp-note");
	if (getSetting("popupEgg") !== undefined) {
		popupEggInp.classList.remove("hidden");
		popupEggInpLabel.classList.remove("hidden");
		popupEggInpNote.classList.add("hidden");
	} else {
		popupEggInp.classList.add("hidden");
		popupEggInpLabel.classList.add("hidden");
		popupEggInpNote.classList.remove("hidden");
	}

	// Toggle hidden class
	if (popup.classList.contains("hidden")) {
		popup.classList.remove("hidden");
		qs("#search-container").classList.add("hidden");
	}
	else {
		popup.classList.add("hidden");
		qs("#search-container").classList.remove("hidden");
	}
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

