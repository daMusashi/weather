/**
 * Class för forecast-day divarna
 */
function Day(container, index){
	this.index = index;
	this.dagDom = null;
	this.dateDom = null;
	this.weatherListContainer = null;

	this.attachDOM(container);
}

Day.prototype.update = function(dayDataObject){
	$(this.dagDom).text(dayDataObject.day);
	$(this.dateDom).text(dayDataObject.date);

	this.weatherListContainer.innerHTML = "";
	for(var i = 0; i < dayDataObject.list.length; i++){
		var weather = new UIWeather(this.weatherListContainer, dayDataObject.dayWeekNum+i);
		weather.create(dayDataObject.list[i]);
	}
};

Day.prototype.attachDOM = function(container){
	var outer = document.createElement("div");
	outer.id = "day-"+this.index;
	outer.className = "day "+outer.id;
	var inner = document.createElement("div");
	inner.className = "inner";

	// dag
	this.dagDom = document.createElement("h2");
	this.dagDom.className = "day-name";
	this.dagDom.innerHTML = "-";

	// date
	this.dateDom = document.createElement("p");
	this.dateDom.className = "date";
	this.dateDom.innerHTML = "--";

	// weather
	this.weatherListContainer = document.createElement("table");
	this.weatherListContainer.className = "weather-list";

	outer.appendChild(inner);
	inner.appendChild(this.dagDom);
	inner.appendChild(this.dateDom);
	inner.appendChild(this.weatherListContainer);

	container.appendChild(outer);
};