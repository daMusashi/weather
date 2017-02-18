/**
 * Created by Martin on 2015-12-12.
 */

/**
 * Manager för all väder-data
 * @param {Weather} app - Appen
 * @constructor
 */
function ForecastManager(app){
    this._app = app;

    var heroesContainerId = "panel-heroes";
    var daysContainerId = "days-container";

    /**
     * Håller API för väderdatan (förvalt SMHI)
     * @type {SMHIForecastAPI}
     */
    this.api = new SMHIForecastAPI();
    this.api.addOnChangeListener(new Handler(this.onDataChanged, this));

    /**
     * Håller UI för väderdatan
     * @type {SMHIForecastUI}
     */
    this.ui = new SMHIForecastUI(heroesContainerId, daysContainerId);

    this.days = [];

    this.loadingModalDOM = new UIDialogFactory.getWaitModalDOM("Laddar data från SMHI...");

    this.googlePlatsData = null; // sparar senaste platsdata för att kunna uppdatera utan ny platsdata

    this._onChangeListeners = new HandlerStack();
}

/**
 * Lägger till lyssnare för onChange (nytt dataset)
 * @param {Handler} listener
 */
ForecastManager.prototype.addOnChangeListener = function(listener){
    this._onChangeListeners.add(listener);
};

ForecastManager.prototype.update = function(googlePlaceData, me){
    var me = me || this;
    var plats = googlePlaceData || this.googlePlatsData;

    if(plats) {
        this.googlePlatsData = plats;
        $(this.loadingModalDOM).modal();
        me.api.update(this.googlePlatsData);
    }
};

ForecastManager.prototype.onDataChanged = function(data, me){
    console.log("Forecast Manager: data changed...");
    //console.log(data);
    if(this.loadingModalDOM) {
        $(this.loadingModalDOM).modal("hide");
    }

    this._onChangeListeners.handlerCall(data);

    this.ui.update(data);

    //UIFactory.scrollify(this.dayItemsContainer, true, false);
    //initWeatherUIFunctions();
    //responsify();

    // item test
    /*var table = document.createElement("table");
    for(var i = 0; i < data.weatherItems.length; i++) {
        var itemUI = data.weatherItems[i].getUI();
        table.appendChild(itemUI.getTdDOM());
    }
    c.appendChild(table);*/




};