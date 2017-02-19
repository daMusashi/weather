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

/**
 * Appens main objekt. Statiskt objekt.
 * @constructor
 */
function Weather(){}

Weather.libsToLoad = 2;
Weather.libsLoaded = 0;

/**
 * Initierar appen
 */
Weather.init = function(){
    console.log("Weather: _app Init");

    /**
     * Håller UI
     * @type {WeatherUI}
     */
    this.ui = new WeatherUI(this);
    /**
     * Håller aktuell plats
     * @type {GooglePlaceManager}
     */
    this.plats = new GooglePlaceManager(this);
    this.plats.addOnChangeListener(new Handler(platsChanged));
    /**
     * Håller radarbild
     * @type {SMHIRadarUI}
     */
    this.radar = new SMHIRadarUI(document.getElementById("panel-radar"));
    //radar.start();
    /**
     * Håller UI Header
     * @type {HeaderUI}
     */
    this.header = new HeaderUI(document.getElementById("panel-header"));
    /**
     * Håller UI Foter
     * @type {FooterUI}
     */
    this.footer = new FooterUI(document.getElementById("panel-footer"));
    /**
     * Håller aktuellt dataset
     * @type {ForecastManager}
     */
    this.forecast = new ForecastManager(this); // inner för scrollning
    this.forecast.addOnChangeListener(new Handler(forecastChanged, this));

    /*radarUI = new SMHIRadarUI(document.getElementById("weather-heroes"), 300);
     radarAPI = new SMHIRadarAPI(24, "start", radarUI);

     radarAPI.update();*/

    this.footer.updateTimers(this.footer);
    setInterval(this.footer.updateTimers, 10*1000, this.footer);
    setInterval(function(){this.forecast.update()}, 10*60*1000);

    this.plats.findPlace();

    this.ui.init();
    this.ui.manageSizes();
};

/**
 * Handler för när plats ändras
 * @param {GooglePlaceData} placeData
 */
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
