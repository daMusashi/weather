/**
 * Created by Martin on 2015-12-11.
 */

/**
 * Hållare av aktuell väder-dataset
 * @param {string} approvedTimeUTC - UTC. Tiden då datasetet skapades/godkändes hos provider (tiden då prognoserna beräknandes/gäller för)
 * @constructor
 */
function DataAdapterSMHI(approvedTimeUTC){

    this._dataset = new ProviderDataset(approvedTimeUTC);
    this._dataset.provider = "SMHI";
    this._dataset.providerDesc = "<p>SMHI, Sveriges meteorologiska och hydrologiska institut, är en expertmyndighet under Miljö- och energidepartementet."+
        "Vi ser hela samhället som våra 'kunder'; privatpersoner, myndigheter, politiker, forskare och företag.</p>"+
        "<p>Väder och vatten går över alla gränser och vi har omfattande samarbeten med både svenska myndigheter och internationella organisationer och forskare.</p>"+
        "<p>Vårt uppdrag är också att genom affärsverksamhet serva näringslivet med branschanpassade tjänster. Det kan handla om exempelvis energibranschen, massmedia och transportsektorn.</p>";
    this._dataset.providerUrl = "http://www.smhi.se/vadret/vadret-i-sverige/ortsprognoser";

    this.responseDataItems = [];
}

/**
 * Lägger till ett väder data item (i timeseries) från SMHI's API respons
 * @param {object} responseDataItem - JSON väder data item från SMHI's API
 */
DataAdapterSMHI.prototype.addDataItem = function(responseDataItem){
    this.responseDataItems.push(responseDataItem);
};

/**
 * Konverterar tillagd responsdata addDataItem) till app dataitems (ForecastDataItem) och returnerar ett dataset (ProviderDataset)
 */
DataAdapterSMHI.prototype.getDataset = function(){

    for(var i = 0; i < this.responseDataItems.length; i++) {

        var responseDataItem = this.responseDataItems[i];
        var responseDataItemParameters = responseDataItem.parameters;
        var responseDataValidTime = responseDataItem.validTime;

        var appDataItem = new ForecastDataItem(responseDataValidTime);

        for (var j = 0; j < responseDataItemParameters.length; j++) {
            var responseItem = responseDataItemParameters[j];

            switch (responseItem.name) {
                case "t": // Lufttemperatur på 2 meters höjd över marken
                    appDataItem.temp.set(Math.round(responseItem.values[0]), responseItem.unit);
                    appDataItem.data.push(appDataItem.temp);
                    break;
                case "vis": // Horisontell sikt på 10 meters höjd över havet, max 50?
                    appDataItem.sikt.set(responseItem.values[0], responseItem.unit);
                    appDataItem.data.push(appDataItem.sikt);
                    break;
                case "wd": // wind direction grader
                    appDataItem.vindRiktning.set(responseItem.values[0], responseItem.unit);
                    appDataItem.data.push(appDataItem.vindRiktning);
                    break;
                case "ws": // wind speed
                    appDataItem.vindHastighet.set(responseItem.values[0], responseItem.unit);
                    appDataItem.data.push(appDataItem.vindHastighet);
                    break;
                case "gust": // Byvindhastighet på 10 meters höjd över marken
                    appDataItem.vindByarHastighet.set(responseItem.values[0], responseItem.unit);
                    appDataItem.data.push(appDataItem.vindByarHastighet);
                    break;
                case "hmsl": // Mean sea level pressure. Lufttryck omräknat till havsytans nivå
                    appDataItem.lufttryck.set(responseItem.values[0], responseItem.unit);
                    appDataItem.data.push(appDataItem.lufttryck);
                    break;
                case "r": // Relativ luftfuktighet på 2 meters höjd över marken
                    appDataItem.luftfuktighet.set(responseItem.values[0], responseItem.unit);
                    appDataItem.data.push(appDataItem.luftfuktighet);
                    break;
                case "tstm": // Sannolikhet för åska [%]
                    appDataItem.askSannolikhet.set(responseItem.values[0], responseItem.unit);
                    appDataItem.data.push(appDataItem.askSannolikhet);
                    break;
                case "tcc_mean": // total molnighet octas (finns också uppdelad low, med, high)
                    appDataItem.molnighet.set(responseItem.values[0], responseItem.unit);
                    appDataItem.data.push(appDataItem.molnighet);
                    break;
                case "pcat": // nederbördstyp
                    var cat = responseItem.values[0] || 0;
                    appDataItem.nederbord.set(cat, responseItem.unit);
                    appDataItem.data.push(appDataItem.nederbord);
                    break;
                case "pmean": // medel av nederbördsintensitet i kg/m2/h, kan översättas som mm/h, se http://www.smhi.se/kunskapsbanken/meteorologi/hur-mats-nederbord-1.637
                    //this.nederbordMangd = new ForecastDataItemParameter("Nederbördsintensitet (medel)", item.values[0], item.unit);
                    appDataItem.nederbordMangd.set(responseItem.values[0], "mm");
                    appDataItem.data.push(appDataItem.nederbordMangd);
                    //console.log("nedmängd (medel): "+this.nederbordMangd);
                    break;
                case "pmax": // medel av nederbördsintensitet
                    appDataItem.nederbordMangdMax.set(responseItem.values[0], responseItem.unit);
                    appDataItem.data.push(appDataItem.nederbordMangdMax);
                    //console.log("nedmängd (max): "+this.nederbordMangdMax);
                    break;
                case "pmin": // medel av nederbördsintensitet
                    appDataItem.nederbordMangdMin.set(responseItem.values[0], responseItem.unit);
                    appDataItem.data.push(appDataItem.nederbordMangdMin);
                    break;
            }

        }

        this._dataset.addItem(appDataItem);
    } // end for

    return this._dataset;

    // skapar waetherDays
    /*var dayItems = [];
    var daysIndex = 0;

    // skapar en array med items efter dag
    for(var i = 0; i < this.weatherItems.length; i++){

        var item = this.weatherItems[i];
        var itemDay = item.dateobject.getDateString();
        //console.log("processar "+itemDay);
        if(itemDay in dayItems){
            dayItems[itemDay].push(item);
        } else {
            // ser till att max maxDays läggs till
            //console.log(daysIndex);
            if(daysIndex < CONFIG.maxDays) {
                dayItems[itemDay] = [];
                daysIndex++;
            } else {
                break;
            }

        }
    }

    // Skapar dataDays-objekt of arrayn ovan och sparar i WeatherDays
    for(dayIndex in dayItems){
        var day = new ForecastDay();
        day.addItems(dayItems[dayIndex]);
        this.weatherDays.push(day);
    }*/
};

// returnerar dataItem närmast givet datetime
DataAdapterSMHI.prototype.getClosestItem = function(dateObj){
    var date = dateObj || new Date();
    var items = this.weatherItems.slice();

    items.sort(function(aItem, bItem){
        return Math.abs(1 - aItem.dateobject / date) - Math.abs(1 - bItem.dateobject / date);
    });

    //console.log("LETAR närmast till - "+ date);
    //console.log("HITTADE - "+ items[0].dateobject);
    //console.log(items);

    return items[0];
};