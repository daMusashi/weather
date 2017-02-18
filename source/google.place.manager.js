/**
 * Created by Martin on 2015-12-15.
 */
function GooglePlaceManager(app){

    this._app = app;

    this.mapContainerId = "panel-map";

    this.map = new GoogleMapUI(this.mapContainerId);
    this.map.setOnChangeListener(this._onMapChange, this);
    this.map.init();

    this.place = new GooglePlaceAPI();
    this.place.setOnChangeListener(this._onPlaceChange, this);

    this.platsTitle  = document.createElement("h2");
    $(this.platsTitle).attr("id", "plats-title");

    this.gettingModalDOM = new UIDialogFactory.getWaitModalDOM("Hämtar plats...");
    this.notFoundModalDOM = new UIDialogFactory.getMessageModalDOM("Plats okänd", "<p>Kunde inte hämta din plats.</p><p>Det kan bero på att du inte tillåter det (webbläsare) eller inte har positions-funktion påslagen (mobilt)</p><p><strong>Välj en plats från kartan</strong></p>");

}

GooglePlaceManager.prototype.setOnChangeListener = function(listener, listenerSource){
    this.listener = listener;
    this.listenerSource = listenerSource;
};

// när kartplats ändrats av user
GooglePlaceManager.prototype._onMapChange = function(latLong){
    console.log("Weather: Kartplats ändrad");
    this._app.ui.closeMap();
    this.setCoord(latLong.lat, latLong.long);
}

// när koordinat reverse geocodats
GooglePlaceManager.prototype._onPlaceChange = function(googlePlaceData){
    console.log("Weather: Väderplats ändrad");

    // sätter karta ifall koord kommer från brpwser (ifall från kartändring: återsätter/justerar)
    this.map.setCoord(googlePlaceData.lat, googlePlaceData.long);

    $(this.platsTitle).text(googlePlaceData.getString());

    if(this.listener) {
        if (this.listenerSource) {
            this.listener.call(this.listenerSource, googlePlaceData, this.listenerSource);
        } else {
            this.listener(googlePlaceData);
        }
    }
};

// frågar enhet om geo-coordinater
GooglePlaceManager.prototype.findPlace = function(){
    $(this.gettingModalDOM).modal();

    var me = this;

    var options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 15*1000
    };

    function placeSuccess(position){
        $(me.gettingModalDOM).modal("hide");
        if(position){
            console.log("Weather: PLATS HITTAD");
            me.setCoord(position.coords.latitude, position.coords.longitude);
        } else {
            console.log("Weather: FELAKTIG POSITION");
        }
    }

    function placeFail(){
        $(me.gettingModalDOM).modal("hide");
        console.log("Weather: PLATS KUNDE INTE HITTAS (eller användaren blockar). Visar karta.");
        $(me.notFoundModalDOM).modal();
        me._app.ui.openMap();

    }

    navigator.geolocation.getCurrentPosition(placeSuccess, placeFail, options);
};

// extern ändring - findPlace hamnar här
GooglePlaceManager.prototype.setCoord = function(lat, long){
    //console.log("extern set coord");
    this._setCoord(lat, long);
};


GooglePlaceManager.prototype._setCoord = function(lat, long){
    //console.log("intern set coord");
    this.place.getPlaceFromCoord(lat, long);
};



