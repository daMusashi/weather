/**
 * Created by Martin on 2015-12-12.
 */
function SMHIForecastManager(app, heroContainerId, daysContainerId){
    this.App = app;

    this.heroesContainerId = "panel-heroes";
    this.daysContainerId = "days-container";

    this.api = new SMHIForecastAPI();
    this.api.setOnChangeListener(this.onDataChanged, this);

    this.ui = new SMHIForecastUI(this.heroesContainerId, this.daysContainerId);

    this.days = [];

    this.loadingModalDOM = new UIDialogFactory.getWaitModalDOM("Laddar data från SMHI...");

    this.googlePlatsData = null; // sparar senaste platsdata för att kunna uppdatera utan ny platsdata
}

SMHIForecastManager.prototype.setOnChangeListener = function(listener, listenerSource){
    this.listener = listener;
    this.listenerSource = listenerSource;
};

SMHIForecastManager.prototype.update = function(googlePlaceData, me){
    var me = me || this;
    var plats = googlePlaceData || this.googlePlatsData;

    if(plats) {
        this.googlePlatsData = plats;
        $(this.loadingModalDOM).modal();
        me.api.update(this.googlePlatsData);
    }
};

SMHIForecastManager.prototype.onDataChanged = function(data, me){
    console.log("Forecast Manager: data changed...");
    //console.log(data);
    if(this.loadingModalDOM) {
        $(this.loadingModalDOM).modal("hide");
    }

    if(me.listener) {
        if (me.listenerSource) {
            me.listener.call(me.listenerSource, data, me.listenerSource);
        } else {
            me.listener(data);
        }
    }

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