/**
 * Created by Martin on 2015-12-12.
 */

/**
 * Manager för all väder-data
 * @constructor
 */
function ForecastManager(){

    /**
     * Håller API för väderdatan (förvalt SMHI)
     * @type {ProviderAPISMHI}
     */
    this.api = new ProviderAPISMHI();
    this.api.addOnChangeListener(new Handler(this.onDataChanged, this));

    /**
     * Håller UI för väderdatan
     * @type {SMHIForecastUI}
     */
    this.ui = new SMHIForecastUI();

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

/**
 * Uppdaterar väder-datan (via API Provider)
 * @param {GooglePlaceData} googlePlaceData
 */
ForecastManager.prototype.update = function(googlePlaceData){
    var plats = googlePlaceData || this.googlePlatsData;

    if(plats) {
        this.googlePlatsData = plats;
        $(this.loadingModalDOM).modal();
        this.api.update(this.googlePlatsData);
    }
};

/**
 * Handler/listener för när (ny) data laddats
 * @param {ForecastDataset} data
 */
ForecastManager.prototype.onDataChanged = function(dataset){
    console.log("Forecast Manager: data changed...");
    //console.log(data);
    if(this.loadingModalDOM) {
        $(this.loadingModalDOM).modal("hide");
    }

    this._onChangeListeners.handlerCall(dataset);

    this.ui.update(dataset);

};