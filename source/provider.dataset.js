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
     * Datan från provider konverterade till ForecastDataItem
     * @type {Array}
     */
    this.dataItems = [];
}

/**
 * Lägger till en app data item
 * @param {ForecastDataItem} dataItem
 */
ProviderDataset.prototype.addItem = function(dataItem){
    this.dataItems.push(dataItem);
}
