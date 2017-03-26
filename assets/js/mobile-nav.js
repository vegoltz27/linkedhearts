window.onHamburgerClick = function() {
	var mainNavVisibleClass = 'qs-main-nav--visible';
	var mainNavClass = 'qs-main-nav';
	var mainNavElement = document.querySelector('.' + mainNavClass);
	if(mainNavElement.className.includes(mainNavVisibleClass)){
		mainNavElement.className = mainNavClass;
	} else {
		mainNavElement.className = mainNavClass + ' ' + mainNavVisibleClass;
	}
};