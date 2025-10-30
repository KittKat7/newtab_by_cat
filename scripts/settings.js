/**
 * @copyright 2025 by KittKat. All rights reserved
 * https://kittkat.xyz
 */

/** Settings for the page */
let settings = {};

/**
 * The default settings  
 * `user`: String or null  
 * `popupEgg`: null, true, false  
 */
const DEFAULT_SETTNGS = {
	"name": null,
	"greeting": "dynamic",
	"popupEgg": undefined,
}

/**
 * Returns a new map with all the default settings applies
 * @returns A new map with the default settings
 */
function defaultSettings() {
	let r = {};
	Object.keys(DEFAULT_SETTNGS).forEach(k => {
		r[k] = DEFAULT_SETTNGS[k];
	});
	return r;
}

/**
 * Initialized the settings (reads them if they are not already read)
 */
function initSettings() {
	if (Object.keys(settings).length === 0) readSettings();
}

/**
 * Reads the settings saved in local storage
 */
function readSettings() {
	let settingsStr = localStorage.getItem("settings");
	settings = settingsStr === null ? defaultSettings() : JSON.parse(settingsStr);
}

/**
 * Writes the current settings to local storage
 */
function writeSettings() {
	localStorage.setItem("settings", JSON.stringify(settings));
}

/**
 * Resets the settings in local storages and loads from DEFAULT_SETTINGS
 */
function clearSettings() {
	localStorage.removeItem("settings");
	readSettings();
}

/**
 * Gets a specified setting
 */
function getSetting(key) {
	initSettings();
	return settings[key];
}

/**
 * Gets and returns the entire settings map
 * @returns The settings map
 */
function getAllSettings() {
	initSettings();
	return settings;
}

/**
 * Sets a specific setting
 */
function setSetting(key, value) {
	initSettings();
	settings[key] = value;
	writeSettings();
}

/**
 * Takes a map as a param and saves it as the settings map
 * @param {*} map
 */
function setSettings(map) {
	initSettings();
	Object.keys(map).forEach(k => {
		settings[k] = map[k];
	});
	writeSettings();
}

/**
 * 
 * @returns "chrome" | "firefox" | undefined
 */
function detectBrowser() {
	const userAgent = navigator.userAgent;

	if (userAgent.includes("Chrome")) {
		return "chrome";
	} else if (userAgent.includes("Firefox")) {
		return "firefox"
	} else {
		return undefined;
	}
}