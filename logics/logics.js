"use strict";

let constraintObj = {
	audio: true,
	video: {
		facingMode: "user",
		width: { min: 640, ideal: 1280, max: 1920 },
		height: { min: 480, ideal: 720, max: 1080 },
	},
};

// handle older browsers that might implement getUserMedia in some way

if (navigator.mediaDevices === undefined) {
} else {
	navigator.mediaDevices
		.enumerateDevices()
		.then((devices) => {})
		.catch((err) => {
			console.error(err.name, err.message);
		});
}
navigator.mediaDevices
	.getUserMedia(constraintObj)
	.then((mediaStreamObj) => {
		let video = document.querySelector("video");
		if ("srcObject" in video) {
			video.srcObject = mediaStreamObj;
		} else {
			// old version
			video.src = window.URL.createObjectURL(mediaStreamObj);
		}
		video.onloadedmetadata = function (event) {
			// show in the video element what is being captured by the webcam
			video.play();
		};
		// add listeners for saving video/audio
		let start = document.getElementById("start_recording");
		let stop = document.getElementById("stop_recording");
		let save_video = document.getElementById("vid2");
		let mediaRecorder = new mediaRecorder(mediaStreamObj);
		let chunks = [];
		start.addEventListener("click", (event) => {});
		stop.addEventListener("click", (event) => {});
		mediaRecorder.ondataavailable = function (event) {};
		mediaRecorder.onstop = function (event) {};
	})
	.catch((err) => {
		console.error(err.name, err.message);
	});
