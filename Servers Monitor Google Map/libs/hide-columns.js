var buttons = document.getElementsByClassName('btn-hide-column');


for (var i = 0; i < buttons.length; i++) {
   buttons[i].onclick = function() {
    toggleColumn(this.offsetParent.cellIndex+1);
  };
}

function toggleColumn(columnid) {
	var rows = document.querySelectorAll(`.mytable tr > *:nth-child(${columnid})`); 
  rows.forEach(row => {
  	row.classList.toggle('hidden');
  });
}
