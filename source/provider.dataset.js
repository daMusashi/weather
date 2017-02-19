/**
 * Created by Martin on 2017-02-19.
 */

/**
 * Objekt som håller dataset från provider konverterat till app-objekt
 * @param {String} approvedTimeUTC - UTC. Tiden då datasetet skapades/godkändes hos provider (tiden då prognoserna beräknandes/gäller för)
 * @constructor
 */
function ProviderDataset(approvedTimeUTC){
    /**
     * Tiden då datasetet skapades/godkändes hos provider (tiden då prognoserna beräknandes/gäller för)
     * @type {Date}
     */
    this.approvedTime = new Date(approvedTimeUTC);
    /**
     * Namnet på tjänsten som levererar datan
     * @type {string}
     */
    this.provider = "";
    /**
     * Beskrivning av tjänsten som levererar datan
     * @type {string}
     */
    this.providerDesc = "";
    /**
     * Länk till tjänsten som levererar datan
     * @type {string}
     */
    this.providerUrl = "";

    /**
     * Datan från provider konverterade till {@link ForecastDataItem}
     * @type {Array}
     */
    this.dataItems = [];
    /**
     * Datan från provider konverterade till {@link ForecastDay}
     * @type {Array}
     */
    this.dataDays = [];
}

/**
 * Lägger till en app data item
 * @param {ForecastDataItem} dataItem
 */
ProviderDataset.prototype.addItem = function(dataItem){
    this.dataItems.push(dataItem);
};

/**
 * Beräknar och sorterar. Kör när all data är tillagd
 */
ProviderDataset.prototype.process = function(){

};

