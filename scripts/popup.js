/**
 * @copyright 2025 by KittKat. All rights reserved
 * https://kittkat.xyz
 */


let katClicks = 0;

(function main() {
	readSettings();
	document.getElementById("kat").addEventListener("click", katClick)
	if (getSetting("popupEgg")) showPopupEgg(true);
})();

function katClick() {
	katClicks++;
	if (katClicks >= 7) {
		showPopupEgg(true);
	}
}

function showPopupEgg(show) {
	if (show) {
		document.querySelector("body").classList.add("tra");
		if (getSetting("popupEgg") === undefined) setSetting("popupEgg", false);
	}
	else {
		document.querySelector("#kat").innerHTML = "=^^=";
		document.querySelector("body").classList.remove("tra");
	}
}