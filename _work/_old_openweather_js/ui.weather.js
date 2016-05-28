/**
 * Class för forecast-day divarna
 */
function UIWeather(container, id){
	this.container = container;
	this.id = "weather-"+id;
	this.timeDom = null;
	this.tempDom = null;
	this.descDom = null;
	this.iconDom = null;

	this.iconPath = "gfx/";
}

UIWeather.prototype.create = function(weatherDataObject){
	this.createDOM();
	console.log(weatherDataObject);
	this.timeDom.innerHTML = "kl. "+weatherDataObject.timeTimme;
	this.tempDom.innerHTML = weatherDataObject.temp + "&deg;";
	this.descDom.innerHTML = weatherDataObject.desc;

	var iconUrl = this.iconPath + weatherDataObject.icon + "_16.png";
	var icon = document.createElement("img");
	icon.src = iconUrl;
	this.iconDom.appendChild(icon);
};

UIWeather.prototype.createDOM = function(){
	var tr = document.createElement("tr");
	tr.id = this.id;
	tr.className = "weather ";

	// tid
	var timeTd = document.createElement("td");
	timeTd.className = "time";
	this.timeDom = document.createElement("span");
	timeTd.appendChild(this.timeDom);

	// temp
	var tempTd = document.createElement("td");
	tempTd.className = "temperatur";
	this.tempDom = document.createElement("span");
	tempTd.appendChild(this.tempDom);

	// desc
	var descTd = document.createElement("td");
	descTd.className = "desc";
	this.descDom = document.createElement("span");
	descTd.appendChild(this.descDom);

	// icon
	var iconTd = document.createElement("td");
	iconTd.className = "icon";
	this.iconDom = document.createElement("span");
	iconTd.appendChild(this.iconDom);


	tr.appendChild(timeTd);
	tr.appendChild(tempTd);
	tr.appendChild(descTd);
	tr.appendChild(iconTd);

	this.container.appendChild(tr);
};