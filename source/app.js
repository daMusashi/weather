/**
 * Created by Martin on 2015-12-27.
 */

$(document).ready(function(){
    Weather.libsLoaded++;
    console.log("Weather: Main Libs loaded ("+Weather.libsLoaded+"/"+Weather.libsToLoad+")");

    if(Weather.libsLoaded == Weather.libsToLoad) {
        Weather.init();
    }
})

$(window).on("resize", function(){
    Weather.ui.manageSizes();
});

// Google API kan vara färdigtladdat EFTER document.ready
function apiloaded(){
    Weather.libsLoaded++;
    console.log("Weather: External Lib loaded ("+Weather.libsLoaded+"/"+Weather.libsToLoad+")");

    if(Weather.libsLoaded == Weather.libsToLoad) {
        Weather.init();
    }

}

function Weather(){}

Weather.libsToLoad = 2;
Weather.libsLoaded = 0;

Weather.init = function(){
    console.log("Weather: App Init");

    this.ui = new WeatherUI(this);

    this.plats = new GooglePlaceManager(this);
    this.plats.setOnChangeListener(platsChanged);

    this.radar = new SMHIRadarUI(document.getElementById("panel-radar"));
    //radar.start();

    this.header = new HeaderUI(document.getElementById("panel-header"));

    this.footer = new FooterUI(document.getElementById("panel-footer"));

    this.forecast = new SMHIForecastManager(this); // inner för scrollning
    this.forecast.setOnChangeListener(forecastChanged);

    /*radarUI = new SMHIRadarUI(document.getElementById("weather-heroes"), 300);
     radarAPI = new SMHIRadarAPI(24, "start", radarUI);

     radarAPI.update();*/

    this.footer.updateTimers(this.footer);
    setInterval(this.footer.updateTimers, 10*1000, this.footer);
    setInterval(function(){this.forecast.update()}, 10*60*1000);

    this.plats.findPlace();

    this.ui.init();
    this.ui.manageSizes();
}

// När plats-data hämtats/ändrats
function platsChanged(placeData){
    console.log("Weather: Plats ändrad");
    Weather.forecast.update(placeData);
    Weather.header.setPlatsnamn(placeData.getString());
    //UIDialogFactory.showError("hallå");
}

// när kartplats ändrats av user - aktiverar platsChanged
function mapChanged(latLong){
    console.log("MAP CHANGED");
    this.ui.closeMap();
    plats.setCoord(latLong.lat, latLong.long);
}

function forecastChanged(forecastData){
    //console.log(forecastData);
    Weather.footer.setForecastTime(forecastData.approvedTime);
}
