/**
 * API Documentatopn
// https://www.npmjs.com/package/smhi-node
//http://opendata.smhi.se/apidocs/
//http://opendata.smhi.se/apidocs/metfcst/demo_point.html
//http://opendata.smhi.se/apidocs/metfcst/index_openweather.html
*/

/**
 * Objekt som innehåller API-calls för SMHI's API
 * @constructor
 */
function ProviderAPISMHI(){
	this._onChangeHandlers = new HandlerStack();
}

/**
 * Lägger till listener för händelsen (ny) data laddad (on change)
 * @param {Handler} listener
 */
ProviderAPISMHI.prototype.addOnChangeListener = function(listener){
    this._onChangeHandlers.add(listener);
};

/**
 * Hämtar ett nytt dataset från SMHI's API, baserat på en plats
 * @param {GooglePlaceData} googlePlaceData
 */
ProviderAPISMHI.prototype.update = function(googlePlaceData){
	var place = googlePlaceData;

	console.log(place);

	var lat = place.lat.toFixed(4);
	var long = place.long.toFixed(4);

	//var callBase = "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/"+coordLong+"/lat/"+coordLat+"/data.json";
	var callBase = "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/"+long+"/lat/"+lat+"/data.json";
	//console.log(callBase);
	var me = this;

	$.get(callBase)
  		.done(function( data ) {
			console.log("DATA LOADED");
    		console.log(data);

			var provider = new DataAdapterSMHI(data.approvedTime);

			for(var i = 0; i < data.timeSeries.length; i++){
				provider.addDataItem(data.timeSeries[i]);
			}

			var dataset = provider.getDataset();

            me._onChangeHandlers.handlerCall(dataset);
  		})
  		.fail(function() {
    		console.log("VARNING! Kunde inte få forecats fråm SMHI");
  		});
};

