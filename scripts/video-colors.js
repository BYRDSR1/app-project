const videoSetup = async () => {
	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		const wrapper = document.getElementById("wrapper");
		const video = document.createElement("video");
		video.id = "video";
		video.width = video.height = 640;
		video.autoplay = true;
		wrapper.appendChild(video);
	}
}

const videoFeed = () => {
	const video = document.getElementById("video");
	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;
        video.play();
    });
	} else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: true }, function(stream) {
        video.src = stream;
        video.play();
    }, errBack);
	} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({ video: true }, function(stream){
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
    }, errBack);
	} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({ video: true }, function(stream){
        video.srcObject = stream;
        video.play();
    }, errBack);
	}

}

const convertRGBA = (rgba) => {
  let converted = [[rgba[0], rgba[1], rgba[2]]];
  if(rgba[3]) {
    converted.push(rgba[3]);
  }
  return converted;

const findColor = (rgba) => {
	return convertRGBA(rgba);
}
