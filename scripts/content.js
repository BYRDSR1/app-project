//import { videoSetup } from './video-colors.js';

pictureContent = "";

homeContent = '<div id="homepage-wrapper" class="w-100 h-100 d-flex justify-content-center container-fluid" hidden="false"><div id="top-button"class="py-3 h-30 navbar navbar-nav fixed-top justify-content-center"><i class="far fa-image fa-2x"></i></div><div id="homepage-main" class= "w-100 py-5 row flex-row justify-content-center align-self-center"><div id="homepage-main-content" class="w-100 h-100 py-3 flex-row justify-content-center align-self-center align-content-around"><div id="homepage-name" class="h-50"><h1 class="text-center text-weight-bold"><strong></strong></h1></div><br /><div id="homepage-utils" class="d-flex container h-50 flex-row justify-content-around"><div id="homepage-help" class="flex-fill"><i class="fas fa-question fa-2x d-flex justify-content-center"></i></div><div id="homepage-settings" class="flex-fill"><i class="fas fa-cog fa-2x d-flex justify-content-center" onclick="openSettings()"></i></div></div></div></div><div id="bottom-button" class="py-3 h-30 navbar navbar-nav fixed-bottom justify-content-center" onclick="openVideo()"><i class="fas fa-camera fa-2x"></i></div></div>';

videoContent = '<div id="video-wrapper" class="w-100 h-100 d-flex justify-content-center container-fluid"> <div id="video-top-button" class="py-3 h-30 navbar navbar-nav fixed-top justify-content-center" onclick="openHome()"> <i class="fas fa-home fa-2x"></i> </div> <div id="video-main" class= "w-100 py-5 row flex-row justify-content-center align-self-center" > <canvas id="canvas" width="640" height="480" hidden ></canvas></div><div id="video-bottom-bar" class="py-3 h-30 navbar navbar-nav fixed-bottom justify-content-center"><span class="font-weight-bold h5">&nbsp;</span></div></div>' ;

utilsScript = '<script id="utils-script" >const adjustHomepageUtils = () => {const width = document.documentElement.clientWidth;const utils = document.getElementById("homepage-utils");if(width < 493) {utils.classList.contains("justify-content-around") ? null : (() => {utils.classList.contains("justify-content-center") ? (()=>{utils.classList.remove("justify-content-center");utils.classList.add("justify-content-around");})(): utils.classList.add("justify-content-around");})();utils.classList.contains("w-50") ? utils.classList.remove("w-50") : null;} else {//RESUME HEREutils.classList.contains("justify-content-center") ? null : (() => {utils.classList.contains("justify-content-around") ? (() => {utils.classList.remove("justify-content-around");utils.classList.add("justify-content-center");})(): utils.classList.add("justify-content-center");})();utils.classList.contains("w-50") ? null : utils.classList.add("w-50");}}window.addEventListener("DOMContentLoaded", adjustHomepageUtils);document.body.onresize = () => {adjustHomepageUtils()}</script>'

const switchPage = (page) => {
	//getColor = 0;
	//getColor ? clearInterval(getColor) : null;
	intervalID ? stopInterval() : null;
	const wrapper = document.getElementById("outer-wrapper");
	const currPage = wrapper.children[0].id;
	wrapper.children ? (() => {
		j = wrapper.children.length;
		for(let i = 0; i < j; i++) {
			wrapper.removeChild(wrapper.children[0]);
		}
		//document.getElementById("setup") ? document.body.removeChild(document.getElementById("setup")) : null;
	})() : null;
	if(page === "homepage") {
		wrapper.insertAdjacentHTML("afterbegin", homeContent);
		if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
					document.getElementById("homepage-name").children[0].insertAdjacentHTML("afterbegin", '<img src="../images/khroma-name-light.png" alt="Khroma" class="img-fluid align-self-center"  />');
				} else {
					document.getElementById("homepage-name").children[0].insertAdjacentHTML("afterbegin", '<img src="../images/khroma-name.png" alt="Khroma" class="img-fluid align-self-center" />');
				}
	} else if(page === "videopage") {
		wrapper.insertAdjacentHTML("afterbegin", videoContent);
		videoSetup().then(videoFeed())
			//.then(setInterval(colorStuff, 1000));
		adjustHomepageUtils();
	} else if(page === "picturepage") {
		wrapper.insertAdjacentHTML("afterbegin", pictureContent);
	} else {
		if(currPage === "homepage-wrapper") {
			wrapper.insertAdjacentHTML("afterbegin", homeContent);
		} else if(currPage === "video-wrapper") {
			wrapper.insertAdjacentHTML("afterbegin", videoContent);
		} else if(currPage == "picture-wrapper") {
			wrapper.insertAdjacentHTML("afterbegin", pictureContent);
		} else {
			throw new Error("You aren't on a valid page");
		}
		throw new Error("Invalid Page Request");
	}  
}

const toggleIcons = (online) => {
	if(!online) {
		const picBar = document.getElementById("top-button"),
			vidBar = document.getElementById("bottom-button"),
			help = document.getElementById("homepage-help"),
			settings = document.getElementById("homepage-settings");
			let elements = [picBar, vidBar, help, settings];
			elements.forEach((element) => {
				element.removeChild(element.children[0]);
			});
			picBar.insertAdjacentHTML("afterbegin", '<img src="../fonts/camera-solid.svg" />');
	}
}
