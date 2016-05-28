// https://www.npmjs.com/package/smhi-node
//http://opendata.smhi.se/apidocs/
//http://opendata.smhi.se/apidocs/metfcst/demo_point.html
//http://opendata.smhi.se/apidocs/metfcst/index_openweather.html

function SMHIForecastAPI(){

}

SMHIForecastAPI.prototype.setOnChangeListener = function(listener, listenerSource){
	this.listener = listener;
	this.listenerSource = listenerSource;
};

SMHIForecastAPI.prototype.update = function(googlePlaceData){
	var place = googlePlaceData;

	var lat = place.lat.toFixed(4);
	var long = place.long.toFixed(4);

	//var callBase = "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/"+coordLong+"/lat/"+coordLat+"/data.json";
	var callBase = "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/"+long+"/lat/"+lat+"/data.json";
	//console.log(callBase);
	var me = this;

	$.get(callBase)
  		.done(function( data ) {
			//console.log("DATA LOADED");
    		//console.log(data);

			var forecast = new SMHIForecastAPIData(data.approvedTime, place);

			for(var i = 0; i < data.timeSeries.length; i++){
				forecast.addDataItem(data.timeSeries[i].validTime, data.timeSeries[i].parameters);
			}

			forecast.process();

			//console.log(me.source);
			//console.log(me.callback);
			if(me.callback) {
				if (me.source) {
					me.source[me.callback](forecast, me.source);
				} else {
					me.callback(forecast, me.source);
				}
			}
			if(me.listener) {
				if (me.listenerSource) {
					me.listener.call(me.listenerSource, forecast, me.listenerSource);
				} else {
					me.listener(forecast, me.listenerSource);
				}
			}
  		})
  		.fail(function() {
    		console.log("VARNING! Kunde inte få forecats fråm SMHI");
  		});
};

