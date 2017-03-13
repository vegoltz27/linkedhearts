(function () {
	var ul;
	var li_items; 
	var li_count;
	var image_index = 0;
	var VISIBLE_CLASS = 'visible';
	var HIDDEN_CLASS = 'hidden';

	function init(){	
		storeChildren();

		var li_item;

		for (i = 0; i < li_count-1; i++){
			setListItemClass(i, HIDDEN_CLASS); 
		}

		if(li_count) {
			image_index = li_count-1;
			li_item = li_items[image_index];
			setListItemClass(i, VISIBLE_CLASS); 		
		
			setInterval(function() {
				storeChildren();

				setListItemClass(image_index, HIDDEN_CLASS); 	

				image_index++;
				if(image_index >= li_count){
					image_index = 0;
				}

				setListItemClass(image_index, VISIBLE_CLASS); 

			}, 6500);
		}
	}

	function setListItemClass(index, cssClass){
		li_item = li_items[index];
		li_item.className = cssClass; 
	}

	function storeChildren(){
		ul = document.querySelector('.carousel-container');
		li_items = ul.children;
		li_count = li_items.length;
	}

	window.onload = init;
})();
