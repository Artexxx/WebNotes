fetch('twitter.json')
    .then(function (data) {
        return data.json();
    })
    .then(function (json) {
        let elem = document.getElementById('data');

        for(i in json) {
            elem.innerHTML += '<tr><h3><a href="'+json[i].url+'" target="_blank"><b>'+ json[i].name + '</b></a></h3></tr>';
			if(i == 9){
				break;
			}
        }
    });