function onThumbnailClick(e){
	var imgSrc = e.target.attributes['data-url'].value;
	var fullImgContainer = document.querySelector("body .fullimg-container");
	var fullImg, closeBtn;

	if(!fullImgContainer){
		fullImgContainer = document.createElement('div');
		fullImgContainer.className = 'fullimg-container';

		fullImg = document.createElement('img');
		fullImg.className = 'fullimg';
		fullImg.onload = onFullImgLoad;

		closeBtn = document.createElement('span');
		closeBtn.className = 'closebtn closebtn-hidden';
		closeBtn.innerHTML = '[x]';
		closeBtn.onclick = onCloseFullImgClick;

		fullImgContainer.appendChild(fullImg);
		fullImgContainer.appendChild(closeBtn);
		document.body.appendChild(fullImgContainer);
	} else {
		fullImg = document.querySelector("body .fullimg-container .fullimg");
		closeBtn = document.querySelector("body .fullimg-container .closebtn");
	}

	fullImg.src = imgSrc;
	closeBtn.className = 'closebtn closebtn-hidden';
	fullImgContainer.className = 'fullimg-container';
}

function onFullImgLoad(){
	var closeBtn = document.querySelector("body .fullimg-container .closebtn");
	var fullImg = document.querySelector("body .fullimg-container .fullimg");

	if(closeBtn && fullImg){
		setTimeout(function() {
			closeBtn.style.transform = 'translate(' + Math.floor(fullImg.width/2 - 17) + 'px, -' + Math.floor(fullImg.height/2 + 25) + 'px)';
			closeBtn.className = 'closebtn';
		}, 100);
	}
}

function onCloseFullImgClick(){
	var fullImgContainer = document.querySelector("body .fullimg-container");
	fullImgContainer.className = 'fullimg-container fullimg-container-hidden';
}