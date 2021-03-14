"use strict";

let constraintObj = {
	audio: true,
	video: {
		facingMode: "user",
		width: { min: 240, ideal: 310, max: 640 },
		height: { min: 120, ideal: 180, max: 480 },
	},
};

// let constraintObj = {
// 	audio: true,
// 	video: {
// 		facingMode: "user",
// 		width: { min: 240, mid: 640, ideal: 1280, max: 1920 },
// 		height: { min: 180, mid: 480, ideal: 720, max: 1080 },
// 	},
// };
// handle older browsers that might implement getUserMedia in some way

if (navigator.mediaDevices === undefined) {
	navigator.mediaDevices = {};
	navigator.mediaDevices.getUserMedia = function (constraintObj) {
		let getUsrMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		if (!getUsrMedia) {
			return Promise.reject(
				new Error("getUserMedia is not implemented in this browser")
			);
		}
		return new Promise((resolve, reject) => {
			getUsrMedia.call(navigator, constraintObj, resolve, reject);
		});
	};
} else {
	navigator.mediaDevices
		.enumerateDevices()
		.then((devices) => {
			devices.forEach((device) => {
				console.log(device.kind.toUpperCase(), device.label);
			});
		})
		.catch((err) => {
			console.error(err.name, err.message);
		});
}
navigator.mediaDevices
	.getUserMedia(constraintObj)
	.then((mediaStreamObj) => {
		let video = document.getElementById("video");
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
		console.log("mediastream obj: ", mediaStreamObj);
		// add listeners for saving video/audio
		let start = document.getElementById("start_recording");
		let stop = document.getElementById("stop_recording");
		let save_video = document.getElementById("vid2");
		let mRecorder = new MediaRecorder(mediaStreamObj);
		let chunks = [];
		start.addEventListener("click", (event) => {
			mRecorder.start();
			console.log("start recording: ", mRecorder.state);
		});
		stop.addEventListener("click", (event) => {
			mRecorder.stop();
			console.log("stop recording: ", mRecorder.state);
		});
		mRecorder.ondataavailable = function (event) {
			chunks.push(event.data);
			console.log("data available");
		};
		mRecorder.onstop = function (event) {
			let blob = new Blob(chunks, { type: "video/mp4;" });
			chunks = [];
			let videoURL = window.URL.createObjectURL(blob);
			save_video.src = videoURL;
			save_video.type = "video/mp4";
			console.log("recorder stopped");
		};
	})
	.catch((err) => {
		console.error(err.name, err.message);
	});
