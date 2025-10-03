/**
 * @copyright 2025 by KittKat. All rights reserved
 * https://kittkat.xyz
 */


let katClicks = 0;

(function main() {
	readSettings();
	document.getElementById("kat").addEventListener("click", katClick)
	if (getSetting("egg") === "active") showEgg(true);
})();

function katClick() {
	katClicks++;
	if (katClicks >= 7) {
		showEgg(true);
	}
}

function showEgg(show) {
	if (show) {
		document.querySelector("body").classList.add("tra");
		if (getSetting("egg") === null) setSetting("egg", "found");
	}
	else {
		document.querySelector("#kat").innerHTML = "=^^=";
		document.querySelector("body").classList.remove("tra");
	}
}