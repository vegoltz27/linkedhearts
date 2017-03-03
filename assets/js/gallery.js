var lightboxClasses = {
	CONTAINER: 'fullimg-container',
	CONTAINER_HIDDEN: 'fullimg-container-hidden',
	FULL_IMG: 'fullimg',
	CLOSE_BTN: 'closebtn',
	CLOSE_BTN_HIDDEN: 'closebtn-hidden'
};

function createLightbox(){
	fullImgContainer = document.createElement('div');
	fullImgContainer.className = lightboxClasses.CONTAINER;

	fullImg = document.createElement('img');
	fullImg.className = lightboxClasses.FULL_IMG;
	fullImg.onload = onFullImgLoad;

	closeBtn = document.createElement('span');
	closeBtn.className = lightboxClasses.CLOSE_BTN  + ' ' + lightboxClasses.CLOSE_BTN_HIDDEN;
	closeBtn.innerHTML = 'x';
	closeBtn.onclick = onCloseFullImgClick;

	fullImgContainer.appendChild(fullImg);
	fullImgContainer.appendChild(closeBtn);
	document.body.appendChild(fullImgContainer);
}

function findLightboxElements(){
	return {
		fullImgContainer: document.querySelector('.' + lightboxClasses.CONTAINER),
		fullImg: document.querySelector('.'+ lightboxClasses.CONTAINER + ' .' + lightboxClasses.FULL_IMG),
		closeBtn: document.querySelector('.'+ lightboxClasses.CONTAINER + ' .' + lightboxClasses.CLOSE_BTN)
	};
}

function onThumbnailClick(e){
	var imgSrc = e.target.attributes['data-url'].value;
	var fullImgContainer = document.querySelector('.' + lightboxClasses.CONTAINER);
	var lightboxElements;

	if(!fullImgContainer){
		createLightbox();
	}

	lightboxElements = findLightboxElements();

	lightboxElements.fullImg.src = imgSrc;
	lightboxElements.closeBtn.className = lightboxClasses.CLOSE_BTN  + ' ' + lightboxClasses.CLOSE_BTN_HIDDEN;
	lightboxElements.fullImgContainer.className = lightboxClasses.CONTAINER;
}

function onFullImgLoad(){
	var lightboxElements = findLightboxElements();
	var translateX, translateY;

	if(closeBtn && fullImg){
		setTimeout(function() {
			translateX = Math.floor(lightboxElements.fullImg.width/2 - 4);
			translateY = Math.floor(lightboxElements.fullImg.height/2 + 16);
			lightboxElements.closeBtn.style.transform = 'translate(' + translateX + 'px, -' + translateY + 'px)';
			lightboxElements.closeBtn.className = lightboxClasses.CLOSE_BTN;
		}, 100);
	}
}

function onCloseFullImgClick(){
	lightboxElements = findLightboxElements();
	lightboxElements.fullImgContainer.className = lightboxClasses.CONTAINER + ' ' + lightboxClasses.CONTAINER_HIDDEN;
}