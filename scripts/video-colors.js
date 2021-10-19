let intervalID = undefined;
let videoLayout = undefined;

const videoSetup = async () => {
	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
		const wrapper = document.getElementById("video-main");
		const video = document.createElement("video");
		video.id = "video";
		video.width = document.documentElement.clientWidth;
		video.height = document.documentElement.clientHeight;
		video.autoplay = true;
		video.setAttribute("playsinline", "")
		//video["webkit-playsinline"] = true;
		wrapper.appendChild(video);
	} 
}

const errBack = () => {
	document.getElementById("video-main").insertAdjacentHTML("afterbegin", '<div class="w-100 h-100 row flex-row align-self-center justify-content-center"><h4 class="align-self-center text-center font-weight-bold">Sorry, You Need to Enable Camera Access in Settings</h4></div>');
	document.getElementById("video-bottom-bar").children[0].insertAdjacentHTML("afterbegin", '<i class="far fa-frown fa-2x"></i>');
	//switchPage("homepage");
}

const videoFeed = () => {
	const video = document.getElementById("video");
	if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
	let videoOptions = [];
	navigator.mediaDevices.enumerateDevices().then((devices)=>{
		devices.forEach((device)=>{
			device.kind === "videoinput" ? videoOptions.push(device) : null;		
		});
	});
	
	if(videoOptions > 1) {
		videoLayout = "portrait";
	} else {
		videoLayout = "landscape";
	}
	
	let constraints = {
		video: {
			facingMode: {
				ideal: 'environment'
			}
		}
	}

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        //video.src = window.URL.createObjectURL(stream);
	
        video.srcObject = stream;
        video.play();
				if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
					document.getElementById("video-main").insertAdjacentHTML("afterbegin", '<img src="../images/crosshairs-light.png" class="img-fluid align-self-center" style="position: absolute;z-index: 3" />');
				} else {
					document.getElementById("video-main").insertAdjacentHTML("afterbegin", '<img src="../images/crosshairs-dark.png" class="img-fluid align-self-center" style="position: absolute;z-index: 3" />');
				}
 	intervalID = setInterval(colorStuff, 1000);	
    }, errBack);
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

const stopInterval = () => {
	clearInterval(intervalID);
	intervalID = undefined;
}

/* const convertNumberToHex = (num) => {
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
} */

let debateableColors = {
	mOrB: [
		
	],
}

const determineDebateableColor = (color) => {
	if(color == "Maroon" || color == "Brown") {
		if(debateableColors.mOrB[0]) {
			let browns = maroons = 0;
			for(let i = 0; i < debateableColors.mOrB.length; i++) {
				if(debateableColors.mOrB[i] == "brown") {
					browns++;
				} else {
					maroons++;
				}
			}
			console.log(browns, maroons)
			debateableColors.mOrB.length < 10 ? debateableColors.mOrB.push(color.toLowerCase()) : (()=>{debateableColors.mOrB.shift();debateableColors.mOrB.push(color.toLowerCase())})();
			return browns >= maroons ? "Brown" : "Maroon";
		} else {
			debateableColors.mOrB.push(color.toLowerCase());
			return color;
		}
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
		return "Light Green";
	} else if(hue <= 102) {
		return "Grass Green";
	} else if(hue <= 127) {
		return "Green";
	} else if(hue <= 142) {
		return "Bluish-Green";
	} else if(hue <= 157) {
		return "Spring Green";
	} else if(hue <= 172) {
		return "Turquoise";
	} else if(hue <=187) {
		return "Cyan";
	} else if(hue <= 202) {
		return "Bluish-Cyan";
	} else if(hue <= 217) {
		return "Blue";
	} else if(hue <= 232) {
		return "Medium Blue";
	} else if(hue <= 247) {
		return "Medium Blue";
	} else if(hue <= 262) {
		return "Bluish-Purple";
	} else if(hue <= 277) {
		return "Purple";
	} else if(hue <= 292) {
		return "Magenta";
	} else if(hue <= 307) {
		return "Pink";
	} else if(hue <= 322) {
		return "Hot Pink";
	} else if(hue <= 337) {
		return "Bright Pink";
	} else if(hue <= 345) {
		return "Scarlet";
	} else if(hue <= 360) {
		return "Red";
	} else {
		throw new Error("Color hue not Found" + ", " + hue);
	}
}

/* Start White, Gray, Black Hue finding functions */

const orderRGB = (rgb) => {
	let [...temp] = rgb;
  const lowest = temp.splice(temp.indexOf(Math.min(rgb[0], rgb[1], rgb[2])), 1)[0],
		    highest = temp.splice(temp.indexOf(Math.max(rgb[0], rgb[1], rgb[2])), 1)[0],
				middle = temp[0];
	return [lowest, middle, highest];
}

const calcLightness = (rgb) => {
	//lightness = ( Math.max(r,g,b) + Math.min(r,g,b) ) / 2
	const red = rgb[0],
	      green = rgb[1],
	      blue = rgb[2];
	const lightness = ( Math.max(red, green, blue) + Math.min(red, green, blue) ) /2;
	return lightness;
}

const findShade = (rgb) => {
	const orderedRGB = orderRGB(rgb);
	if(( (orderedRGB[1] - orderedRGB[0]) > 10) || ((orderedRGB[2] - orderedRGB[1]) > 10)) {
		return 0;
	} else {
		const lightness = calcLightness(rgb);
		if(lightness >= 200) {
			return "White";
		} else if(lightness >= 150) {
			return "Light Gray";
		} else if(lightness >= 100) {
			return "Gray";
	  } else if(lightness >= 50) {
			return "Dark Gray";
		} else if(lightness >= 0) {
		  return "Black";
	  } else {
			return false;
		}
	}
} 

/* End Monochrome Hue Functions */

const getExactHue = (hue, lightness, isShade) => {
 if((lightness <= 135 && lightness >= 95) || isShade) {
    return hue;
  } else if(lightness > 135) {
  	//Lighter hues
	  switch(hue) {
		  case "Red":
			  return "Pale Pink";
			  break;
		  case "Orange-Red":
			  return "Light Tan";
			  break;
		  case "Orange":
			  return "Light Tan";
			  break;
		  case "Khaki":
			  return "Pale Yellow";
			  break;
		  case "Yellow":
			  return "Pale Yellow";
			  break;
		  case "Lime":
			  return "Pale Lime";
			  break;
		  case "Light Green":
			  return "Pale Light Green";
			  break;
		  case "Grass Green":
			  return "Pale Green";
			  break;
		  case "Green":
			  return "Pale Green";
			  break;
		  case "Bluish-Green":
			  return "Pale Turquoise";
			  break;
		  case "Spring Green":
			  return "Pale Turquoise";
			  break;
		  case "Turquoise":
			  return "Pale Turquoise";
			  break;
		  case "Cyan":
			  return "Pale Cyan";
			  break;
		  case "Bluish-Cyan":
			  return "Pale Light Blue";
			  break;
		  case "Blue":
			  return "Pale Light Blue";
			  break;
		  case "Medium Blue":
			  return "Baby Blue";
			  break;
		  case "Bluish-Purple":
			  return "Light Purple";
			  break;
		  case "Purple":
			  return "Light Purple";
			  break;
		  case "Magenta":
			  return "Baby Pink";
			  break;
		  case "Pink":
			  return "Baby Pink";
			  break;
		  case "Hot Pink":
			  return "Light Pink";
			  break;
		  case "Bright Pink":
			  return "Light Pink";
			  break;
		  case "Scarlet":
			  return "Light Pink";
		  default:
			  throw new Error("Light hue not determined" + ", " + hue);
			  break;
	  }
  } else if(lightness < 95) {
	  //Darker hues
	  switch(hue) {
		  case "Red":
			  return determineDebateableColor("Maroon");
			  break;
		  case "Orange-Red":
			  return determineDebateableColor("Brown");
			  break;
		  case "Orange":
			  return determineDebateableColor("Brown");
			  break;
		  case "Khaki":
			  return "Golden Brown";
			  break;
		  case "Yellow":
			  return "Olive";
			  break;
		  case "Lime":
			  return "Dark Green";
			  break;
		  case "Light Green":
			  return "Dark Green";
			  break;
		  case "Grass Green":
			  return "Dark Green";
			  break;
		  case "Green":
			  return "Dark Green";
			  break;
		  case "Bluish-Green":
			  return "Dark Bluish-Green";
			  break;
		  case "Spring Green":
			  return "Dark Spring Green";
			  break;
		  case "Turquoise":
			  return "Dark Turquoise";
			  break;
		  case "Cyan":
			  return "Dark Cyan";
			  break;
		  case "Bluish-Cyan":
			  return "Navy Blue";
			  break;
		  case "Blue":
			  return "Dark Blue";
			  break;
		  case "Medium Blue":
			  return "Navy Blue";
			  break;
		  case "Bluish-Purple":
			  return "Navy Blue";
			  break;
		  case "Purple":
			  return "Dark Purple";
			  break;
		  case "Magenta":
			  return "Dark Magenta";
			  break;
		  case "Pink":
			  return "Magenta Purple";
			  break;
		  case "Hot Pink":
			  return "Dark Magenta";
			  break;
		  case "Bright Pink":
			  return determineDebateableColor("Maroon");
			  break;
		  case "Scarlet":
			  return determineDebateableColor("Maroon");
		  default:
			  throw new Error("Dark hue not determined" + ", " + hue);
			  break;
	  }
  } else {
	throw new Error("Unable to determine lightness");
  }
}

const getHue = (rgb) => {
	if(findShade(rgb)) {
		return findShade(rgb);
	} else { 
		const red = rgb[0],
			    green = rgb[1],
			    blue = rgb[2];
		const radHue = Math.atan2((Math.sqrt(3) * (green - blue)), ((2 * red) - green - blue));
		let degHue = (radHue * 180) / Math.PI;
		while(degHue < 0) {
			degHue += 360;
		}
		//console.log(degHue)
		return hueToColor(degHue);
	} 
}

const findColor = (rgba) => {
	return convertRGBAToHex(rgba)[0];
}

const identifyColor = (rgb) => {
			//let n_color = ntc.name(findColor(rgb))[1];
			//console.log(n_color);
			//console.log("hue: ", getExactHue(getHue(rgb), calcLightness(rgb), findShade(rgb)), "\nlightness: ", calcLightness(rgb), "\nrough hue: ", getHue(rgb), "\nred: ", rgb[0], " green: ", rgb[1], " blue: ", rgb[2]);
			getExactHue(getHue(rgb), calcLightness(rgb), findShade(rgb)) !== "Maroon" || getExactHue(getHue(rgb), calcLightness(rgb), findShade(rgb)) !== "Brown" ? debateableColors.mOrB = [] : null;
			document.getElementById("video-bottom-bar").children[0].innerHTML = getExactHue(getHue(rgb), calcLightness(rgb), findShade(rgb));
			
			//document.body.style.backgroundColor = "rgb(" + rgb[0]+ ", " + rgb[1] + ", " + rgb[2] + ")";
} 

const colorStuff = () => {
			if(document.getElementById("video-wrapper")) {
				
			
				const canvas = document.getElementById('canvas');
				const context = canvas.getContext('2d');
				const video = document.getElementById('video');
				context.drawImage(video, 0, 0, canvas.width, canvas.height);
				
				//get image data from a 10px x 10px space
				//middle is 315 from left, and 235 down
				
				const imgData = context.getImageData(((640-15) / 2), ((480-15)/2), 15, 15);
				//console.log(imgData);
				let rgb = [imgData.data[0], imgData.data[1], imgData.data[2], imgData.data[3]];
				context.fillStyle = "red";
				context.fillRect(((640-15) / 2), ((480-15)/2), 15, 15)
				//context.stroke()
				identifyColor(rgb);
				//context.putImageData(imgData, 315, 235);
			}else {
				console.log("nope")
			}
}
