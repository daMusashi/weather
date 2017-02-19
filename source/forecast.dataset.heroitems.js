/**
 * Created by Martin on 2017-02-18.
 */

/**
 * Håller speciella värden från aktuellt dataset såsom max/min nedebörd, vind, temp samt när nederbörd startar/slutar
 * @constructor
 */
function ForecastHeroItems(){
    /**
     * Item i datasetet med tidigast tid
     * @type {ForecastDataItem}
     */
    this.firstItem = null;
    /**
     * Item för nuvrande tid
     * @type {ForecastDataItem}
     */
    this.nowItem = null;
    /**
     * Item för kommande "nästa" tid - "Nästa" bestäms i CONFIG, def +2 timmar
     * @type {ForecastDataItem}
     */
    this.nextItem = null;
    /**
     * Item för kommande "later" tid - "later" bestäms i CONFIG, def +6 timmar
     * @type {ForecastDataItem}
     */
    this.laterItem = null;
    /**
     * Item för Max temp i dataset
     * @type {ForecastDataItem}
     */
    this.maxTempItem = null;
    /**
     * Item för Min temp i dataset
     * @type {ForecastDataItem}
     */
    this.minTempItem = null;
    /**
     * Item för Max vind i dataset
     * @type {ForecastDataItem}
     */
    this.maxVindItem = null;
    /**
     * Item för Min temp i dataset
     * @type {ForecastDataItem}
     */
    this.minVindItem = null;
    /**
     * Item för mest nederbörd - Null om ingen nederbörd
     * @type {ForecastDataItem}
     */
    this.maxNederbordItem = null;
    /**
     * Item för mest nederbörd - Null om ingen nederbörd
     * @type {ForecastDataItem}
     */
    this.minNederbordItem = null;
    /**
     * Item för nästa nederbörd - Null om pågående nederbörd
     * @type {ForecastDataItem}
     */
    this.startNederbordItem = null;
    /**
     * Item för när kommande eller pågående nederbörd slutar
     * @type {ForecastDataItem}
     */
    this.endNederbordItem = null;
}

/**
 *  Uppdatera objektet med ett nytt dataset
 * @param {DataAdapterSMHI} data
 */
ForecastHeroItems.prototype.update = function(data){

};
