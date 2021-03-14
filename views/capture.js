// capture input

document.addEventListener("DOMContentLoaded", (event) => {
	let from = document.getElementById("form");
	let inputFile = document.getElementById("capture");
	inputFile.addEventListener("change", (event) => {
		console.dir(inputFile.files[0]);
		if (inputFile.files[0].type.indexOf("image/") > -1) {
			let img = document.getElementById("img");
			img.src = window.URL.createObjectURL(inputFile.files[0]);
		} else if (inputFile.files[0].type.indexOf("audio/") > -1) {
			let audio = document.getElementById("audio");
			audio.src = window.URL.createObjectURL(inputFile.files[0]);
		} else if (inputFile.files[0].type.indexOf("video/") > -1) {
			let video = document.getElementById("video");
			video.src = window.URL.createObjectURL(inputFile.files[0]);
		} else {
			console.log("you are screwed!");
			return;
		}
	});
});
