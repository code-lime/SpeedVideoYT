function setSpeed(video, speed) { video.playbackRate = speed; }
function setVolume(video, volume) { video.volume = volume; }
function getSpeed(video) { return video.playbackRate; }

function apply(parent, video, num) {
	var _x = document.createElement("button");
	_x.style.cssText = 'all:revert'
	_x.innerHTML = "x" + num;
	_x.onclick = function() {
		setSpeed(video, num);
	};
	parent.appendChild(_x);
}
function applyState(parent, video) {
	var _x = document.createElement("label");
	_x.innerHTML = "x?";
	_x.style.fontWeight = 'bold';
	_x.style.paddingLeft = '10px';
	_x.style.paddingRight = '10px';
	_x.style.fontSize = '13px';
	_x.style.color = 'red';
	_x.id = 'apply.state';
	parent.appendChild(_x);
	
	setInterval(function () {
		var new_text = "x" + getSpeed(video);
		if (new_text === _x.innerHTML) return; 
		_x.innerHTML = new_text;
	}, 100);
}
function applyVolume(parent, video) {
	var _x = document.createElement("input");
	_x.type = "range";
	_x.min = 0;
	_x.max = 1000;
	_x.step = 1;
	_x.onchange = function() {
		var v = this.value;
		v /= 1000;
		v = Math.pow(v, 3);
		v *= 0.25;
		v += 0.75
		setVolume(video, v);
		setVolume(video, Math.pow(this.value / 1000, 3) * 0.25);
	};
	parent.appendChild(_x);
}

function applyAll() {
	try {
		var video = document.querySelector(".html5-video-player[id=movie_player] .html5-main-video");
		var title = document.querySelector(".html5-video-player[id=movie_player] .ytp-left-controls");
		if (video !== null && title !== null && title.querySelector("#lime_overlay") === null) {
			var overlay = document.createElement("div");
			overlay.id = "lime_overlay";
			title.appendChild(overlay);
			apply(overlay, video, 1);
			apply(overlay, video, 2);
			apply(overlay, video, 2.5);
			apply(overlay, video, 2.75);
			apply(overlay, video, 3);
			apply(overlay, video, 3.5);
			apply(overlay, video, 4);
			apply(overlay, video, 5);
			apply(overlay, video, 6);
			apply(overlay, video, 10);
			applyState(overlay, video);
			applyVolume(overlay, video);
		}
	} catch {}
	setTimeout(applyAll, 1000);
}

applyAll();