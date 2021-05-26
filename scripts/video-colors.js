const wrapper = document.getElementById("wrapper");
const videoSetup = () => {
	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		const video = document.createElement("video");
		video.id = "video";
		video.width = video.height = 640;
		video.autoplay = true;
		wrapper.appendChild(video);
	}
}

