function update(data){
	console.log("Uppdaterar UI");
	console.log(data);
	ui.update(data);
}


var ui = new UIManager("plats", "days");
var api = new ApiParser("update", ui); // callback, callback-source

$(document).ready(function(){
	ui.create();
	manage_UI_sizes();
	getLocation();
});

$(window).resize(manage_UI_sizes);

/*
	geo-prylar

	se http://diveintohtml5.info/geolocation.html för detaljer

*/
function getLocation() {
	if (Modernizr.geolocation) {
		navigator.geolocation.getCurrentPosition(getLocationSuccessCallback, getLocationErrorCallback);
	} else {
		console.log("INGET STÖD FÖR GEO-POSITION");
	}
}

function getLocationSuccessCallback(position){
	api.update(position.coords.latitude, position.coords.longitude);
}

function getLocationErrorCallback(error){
	switch(error.code){
		case 1:
			console.log("ANVÄNDAREN NEKADE ÅTKOMST TILL POSITION");
			break;
		case 2:
			console.log("INGA RESURSER FÖR POSITIONER TILLGÄNGLIGA (inget nätverk, inga satelitter)");
			break;
		case 3:
			console.log("FÖR LÅNG VÄNTAN PÅ POSITIONERINGS-RESURSER (dåligt nätverk?)");
			break;
		default:
			console.log("OKÄNT POSITIONERINGS-FEL");
	}
	api.update(); // defualt geo
}

