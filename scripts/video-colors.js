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
 if((lightness <= 158 && lightness >= 100) || isShade) {
    return hue;
  } else if(lightness > 158) {
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
  } else if(lightness < 100) {
	  //Darker hues
	  switch(hue) {
		  case "Red":
			  return "Maroon";
			  break;
		  case "Orange-Red":
			  return "Brown";
			  break;
		  case "Orange":
			  return "Brown";
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
			  return "Maroon";
			  break;
		  case "Scarlet":
			  return "Maroon";
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
		return hueToColor(degHue);
	} 
}

const findColor = (rgba) => {
	return convertRGBAToHex(rgba)[0];
}
