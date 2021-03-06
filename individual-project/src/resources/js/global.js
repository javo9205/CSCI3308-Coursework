const MENU_TETHER_DISTANCE_SQUARED = 10000;

var loading_modal = new bootstrap.Modal(document.getElementById('buffer'), {
	keyboard: false
})

let menu_hdr = document.getElementsByClassName('dropmenu');
let menu_cnt = menu_hdr.length
let menu_obj = new Array(menu_cnt);
let menu_pos = new Array(menu_cnt);
let menu_tether = new Array(menu_cnt);

$('document').ready(function() {
	for (let i=0; i<menu_cnt; i++) {
		menu_obj[i] = menu_hdr[i].getElementsByClassName('collapse')[0];
		menu_obj[i].classList.add(`menu-${i}`);
		menu_tether[i] = (1 + MENU_TETHER_DISTANCE_SQUARED) * menu_obj[i].childElementCount;
	}
});

document.addEventListener('mousemove', function(event) {
	let active_menu = $('.dropmenu > .show');
	if (active_menu.length) {
		let id = parseInt(active_menu.attr('class').split(' ')[1].replace('menu-',''));
		if (!menu_pos[id]) {	
			menu_pos[id] = [
				menu_obj[id].offsetLeft + menu_obj[id].offsetWidth / 2,
				menu_obj[id].offsetTop + menu_obj[id].offsetHeight / 2
			];
		}
		let dist_sqrd =
			Math.pow(menu_pos[id][0] - event.clientX, 2) +
			Math.pow(menu_pos[id][1] - event.clientY, 2);
		if (dist_sqrd > menu_tether[id])
			new bootstrap.Collapse(menu_obj[id], {parent:'#navbar'});
	}
}, false);


function heroku_load_modal() {
	document.getElementById('buffer-text').innerText = "Spinning up instance on heroku...";
	loading_modal.show();
	window.location.replace("https://csci3308-018.herokuapp.com/");
}


function enableAxiosPosting(url='') {
	let search_bar = document.getElementById('search-bar')
	search_bar.onsubmit = function(event) {};
	if (url) {
		search_bar.method = "post";
		search_bar.action = url;
	}
}

function updateRating(event) {
	if(event.target.id) {
		let rating = parseInt(event.target.id.replace("rating-",""));
		let i=1;
		for (; i<=rating; i++) {
			$(`#rating-${i}`).parent().css('color', 'gold');
			$(`#rating-desc-${i}`).css('display', 'none');
		}
		for (; i<6; i++) {
			$(`#rating-${i}`).parent().css('color', '');
			$(`#rating-desc-${i}`).css('display', 'none');
		}
		$(`#rating-desc-${rating}`).css('display', 'inherit');
	}
}