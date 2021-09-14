# Documentation 
## Table of Contents
- Video Setup Functions
  - videoSetup()
  - videoFeed()
- Hex Functions
  - convertNumberToHex(num)
  - convertRGBAToHex(rgba)
  - findColor(rgba)
- Hue Functions
  - getHue(rgb)
  - getExactHue(hue, lightness, isShade)
  - hueToColor(hue)
  - orderRGB(rgb)
  - calcLightness(rgb)
  - findShade(rgb)
---
### Video Setup Functions
#### videoSetup()
- Gets access to camera, then sets up the video tag
```
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
```
