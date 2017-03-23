/**
 * Created by Martin on 2015-12-27.
 */

//$(document).ready(function(){
$(window).on("load", function(){
    Weather.setup();
    //console.log("Weather: Main Libs loaded ("+Weather.libsLoaded+"/"+Weather.libsToLoad+")");
});


/* // Google API kan vara färdigtladdat EFTER document.ready
function apiloaded(){
    Weather.libsLoaded++;
    console.log("Weather: External Lib loaded ("+Weather.libsLoaded+"/"+Weather.libsToLoad+")");

    if(Weather.libsLoaded == Weather.libsToLoad) {
        Weather.init();
    }

}*/

/**
 * Appens main objekt. Statiskt objekt.
 * @constructor
 */
function Weather(){}

//Weather.libsToLoad = 1; // kör D3 med CDN
//Weather.libsLoaded = 0;

/**
 * Sätter upp appen
 */
Weather.setup = function(){
    console.log("Weather: Setup");
    /**
     * Håller UI
     * @type {UiManager}
     */
    this.ui = new UiManager();
    /**
     * Håller aktuell plats
     * @type {GooglePlaceManager}
     */
    this.plats = null; // väntar med init till init() så att Google API är laddat

    //radar.start();

    /**
     * Håller aktuellt dataset
     * @type {ForecastManager}
     */
    this.forecast = new ForecastManager(this); // inner för scrollning
    this.forecast.addOnChangeListener(new Handler(forecastChanged, this));

    /*radarUI = new UiSMHIRadar(document.getElementById("weather-heroes"), 300);
     radarAPI = new SMHIRadarAPI(24, "start", radarUI);

     radarAPI.update();*/

    $("#wait-modal-wait").modal();
    $("#wait-modal-wait").modal("hide");

    //if(Weather.libsLoaded == Weather.libsToLoad) {
        Weather.init();
    //}
};


/**
 * Initierar appen
 */
Weather.init = function(){
    console.log("Weather: Init");

    /**
     * Håller aktuell plats
     * @type {GooglePlaceManager}
     */
    this.plats = new GooglePlaceManager(this);
    this.plats.addOnChangeListener(new Handler(platsChanged));

    this.plats.findPlace();

    this.ui.init();
    this.ui.manageLayout();

    $(window).on("resize", function(){
        this.ui.manageLayout();
    });
};


/**
 * Handler för när plats ändras
 * @param {GooglePlaceData} placeData
 */
// När plats-data hämtats/ändrats
function platsChanged(placeData){
    console.log("Weather: Plats ändrad");
    Weather.forecast.update(placeData);
}

// när kartplats ändrats av user - aktiverar platsChanged
function mapChanged(latLong){
    console.log("MAP CHANGED");
    plats.setCoord(latLong.lat, latLong.long);
}

function forecastChanged(dataset){
    this.ui.update(dataset);
}
