/**
 * Behandling av SMHI returdata - Behandlar och håller dataset från SMHI's API
 * @param reponseObject - Dataretur (JSON) från SMHI-API
 * @constructor
 */
function SMHIDataObject(reponseObject){
    /**
	 * Stad
	 * @type {string}
     */
	this.city = reponseObject.city.name;
    /**
     * En array med dataset för dagar
     * @type {DataObjectDay[]}
     */
	this.days = [];

	// Fyller days med tomma dagar
	for(var i = 0; i < 5; i++){
		this.days[i] = new DataObjectDay();
	}

	var currentDay = "";
	var dayIndex = 0;
	var day;
	for(var i = 0; i < reponseObject.list.length; i++){
		var weatherData = new DataObjectWeather(reponseObject.list[i]);
		if(currentDay != weatherData.date){
			if(dayIndex < 5){ // används bara data från 5 dagar (spannet är 5 dagar, så data från sex dagar kan komma)
				day = this.days[dayIndex];
				console.log(dayIndex);
				console.log(this.days);
				day.dayWeekNum = weatherData.weekDayNum;
				currentDay = weatherData.date;
				dayIndex++;
			} else {
				break;
			}
		}
		day.addWeather(weatherData);
	}

}

/**
 * Behandling av SMHI returdata - Samlar ihop DataObjectWeather (weather items) som hör till samma dag
 * @constructor
 */

function DataObjectDay(){
	this.dayWeekNum = -1;
	this.day = "okänt";
	this.date = "0000-00-00";
	this.list = [];

    /**
	 * Lägger till en DataObjectWeather (weather item) till dagen
     * @param {DataObjectWeather} weatherDataobject
     */
	this.addWeather = function(weatherDataobject){
		this.list.push(weatherDataobject);
		this.day = weatherDataobject.day;
		this.date = weatherDataobject.date;
	}

}

/**
 * Behandling av SMHI returdata - Håller ett "weather item", väderdata knuten till en tidpunk
 * @param responseWeatherData
 * @constructor
 */
function DataObjectWeather(responseWeatherData){
	// lägger till 0 i början på intalstimmar
	this.addZero = function(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	};

	this.datetime = new Date();
	this.datetime.setTime(responseWeatherData.dt*1000);
	this.weekDayNum = this.datetime.getDay();
	this.day = "?";
	switch(this.weekDayNum){
		case 1:
			this.day = "Måndag";
			break;
		case 2:
			this.day = "Tisdag";
			break;
		case 3:
			this.day = "Onsdag";
			break;
		case 4:
			this.day = "Torsdag";
			break;
		case 5:
			this.day = "Fredag";
			break;
		case 6:
			this.day = "Lördag";
			break;
		case 0:
			this.day = "Söndag";
			break;
		default:
			this.day = "okänd dag";
	}
	this.date =  this.datetime.toLocaleDateString();
	this.timeAll =  this.datetime.toLocaleTimeString();
	this.timeTimme =  this.addZero(this.datetime.getHours());

	var weather = responseWeatherData.weather[0];
	this.mainDesc = weather.main;
	this.desc = weather.description;
	this.icon = weather.icon; // http://bugs.openweathermap.org/projects/api/wiki/Weather_Condition_Codes

	this.temp = "<strong>"+Math.round(responseWeatherData.main.temp)+"<strong>";

}