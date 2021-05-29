const convertNumberToHex = (num) => {
	if(num > 9) {
		switch(num) {
			case 10:
			  return "A";
				break;
			case 11:
			  return "B";
				break;
			case 12:
			  return "C";
				break;
			case 13:
			  return "D";
				break;
			case 14:
			  return "E";
				break;
			case 15:
			  return "F";
				break;
			default:
			  throw new Error("Not a valid number");
				break;
		}
	} else {
		return num.toString();
	}
}

const convertRGBAToHex = (rgba) => {
	let hex = "#";
	if(rgba.length == 3) {
		for(let i = 0; i < rgba.length; i++) {
			let first = Math.floor(rgba[i] / 16);
			let second = Math.floor(((rgba[i] / 16) - first) * 16);
			hex += convertNumberToHex(first);
			hex += convertNumberToHex(second);
		}
	} else {
		for(let i = 0; i < rgba.length - 1; i++) {
			let first = Math.floor(rgba[i] / 16);
			let second = Math.floor(((rgba[i] / 16) - first) * 16);
			hex += convertNumberToHex(first);
			hex += convertNumberToHex(second);
		}
	}
	return rgba[3] ? [hex, rgba[3]] : [hex];
}

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

const findColor = (rgba) => {
	return convertRGBAToHex(rgba);
}
