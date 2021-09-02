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

const hueToColor = (hue) => {
	if(hue <= 7) {
		return "Red";
	} else if(hue <= 22) {
		return "Orange-Red";
	} else if(hue <= 37) {
		return "Orange";
	} else if(hue <= 52) {
		return "Khaki";
	} else if(hue <= 67) {
		return "Yellow";
	} else if(hue <= 82) {
		return "Lime";
	} else if(hue <= 97) {
		return "Olive";
	} else if(hue <= 102) {
		return "Grass Green";
	} else if(hue <= 127) {
		return "Green";
	} else if(hue <= 142) {
		return "Bluish-Green";
	} else if(hue <= 157) {
		return "Teal";
	} else if(hue <= 172) {
		return "Turquoise";
	} else if(hue <=187) {
		return "Cyan";
	} else if(hue <= 202) {
		return "Bluish Cyan";
	} else if(hue <= 217) {
		return "Light Blue";
	} else if(hue <= 232) {
		return "Blue";
	} else if(hue <= 247) {
		return "Dark Blue";
	} else if(hue <= 262) {
		return "Bluish Purple";
	} else if(hue <= 277) {
		return "Purple";
	} else if(hue <= 292) {
		return "Purple-Magenta";
	} else if(hue <= 307) {
		return "Pink";
	} else if(hue <= 322) {
		return "Hot Pink";
	} else if(hue <= 337) {
		return "Crimson";
	} else if(hue <= 345) {
		return "Scarlet Red";
	} else {
		return "Brown";
	}
}

const findMean = (rgb) => {
  const lowest = Math.min(rgb[0], rgb[1], rgb[2]),
	mid = 
}

const calcLightness = (rgb) => {
	//lightness = ( Math.max(r,g,b) + Math.min(r,g,b) ) / 2
	const red = rgb[0],
	      green = rgb[1],
	      blue = rgb[2];
	const lightness = ( Math.max(red, green, blue) + Math.min(red, green, blue) ) /2;
	return lightness;
}

const getHue = (rgb) => {
	const red = rgb[0],
		green = rgb[1],
		blue = rgb[2];
	const radHue = Math.atan2((Math.sqrt(3) * (green - blue)), ((2 * red) - green - blue));
	let degHue = (radHue * 180) / Math.PI;
	while(degHue < 0) {
		degHue += 360;
	}
	return hueToColor(degHue);
}


const findColor = (rgba) => {
	return convertRGBAToHex(rgba)[0];
}
