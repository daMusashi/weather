function ApiParser(callback, callbackSource){
	this.callback = callback || null;
	this.source = callbackSource || null;

	//this.onData = null; // lagra en lyssnare här
}

ApiParser.prototype.update = function(coordLat, coordLong){
	var callBase = "api.openweathermap.org/data/2.5/forecast?lat=35&lon=139";
	var me = this;

	$.get( "http://api.openweathermap.org/data/2.5/forecast", 
		{ 
			lat: coordLat,
			lon: coordLong,
			lang: "sv",
			units: "metric",
			APPID: "4138642c55ae137f53e88f2fc8d93638" 
		})
  		.done(function( data ) {
    		//alert( "Data Loaded");
    		//console.log(data);

			console.log(me.source);
			console.log(me.callback);
			if(me.callback) {
				if (me.source) {
					me.source[me.callback](new DataObject(data));
				} else {
					me.callback(new DataObject(data));
				}
			}
  		})
  		.fail(function() {
    		alert( "error" );
  		});
}

