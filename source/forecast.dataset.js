/**
 * Created by Martin on 2017-02-19.
 */

/**
 * Objekt som håller dataset från provider konverterat till app-objekt
 * @param {String} approvedTimeUTC - UTC. Tiden då datasetet skapades/godkändes hos provider (tiden då prognoserna beräknandes/gäller för)
 * @constructor
 */
function ForecastDataset(approvedTimeUTC){
    /**
     * Platsobjekt för vilken datan gäller
     * @type {GooglePlaceData}
     */
    this.plats = null;
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
    this.heroItems = new ForecastHeroItems();
}

/**
 * Lägger till en app data item
 * @param {ForecastDataItem} dataItem
 */
ForecastDataset.prototype.addItem = function(dataItem){
    this.dataItems.push(dataItem);
};

/**
 * Beräknar och sorterar. Kör när all data är tillagd
 */
ForecastDataset.prototype.process = function(){
    // skapar dataDays
    var dayItems = [];
    var daysIndex = 0;

    var nederbordItems = [];

    // sortera efter tid (troligen ditlagda efter tid, men för säkerhetsskull) så extra listor som skapas kan antas vara kronologiska
    this.dataItems.sort(function(a, b){
       if(a.timeserial < b.timeserial){
           return -1;
       }
       else if(a.timeserial > b.timeserial){
           return 1;
       } else {
           return 0;
       }

    });

    this.heroItems.firstItem = this.dataItems[0];
    var kommandeTid = new Date();
    this.heroItems.nowItem = this.getClosestItem(kommandeTid);
    kommandeTid.addHours(CONFIG.nextDuration);
    this.heroItems.nextItem = this.getClosestItem(kommandeTid);
    kommandeTid.addHours(CONFIG.laterDuration-CONFIG.nextDuration);
    this.heroItems.laterItem = this.getClosestItem(kommandeTid);

    // loopar igenom dataItems och extreherar värden och objekt
    var hottest = -100;
    var coldest = 100;
    var wetest = -100;
    var dryest = 100;
    var windiest = -100;
    var calmest = 100;

    for(var i = 0; i < this.dataItems.length; i++){

         var item = this.dataItems[i];
         item.decodeValues();

         // hero items
        if(item.temp.value > hottest){
            hottest = item.temp.value;
            this.heroItems.maxTempItem = item;
        }
        if(item.temp.value < coldest){
            coldest = item.temp.value;
            this.heroItems.minTempItem = item;
        }
        if(item.vindHastighet.value > windiest){
            windiest = item.vindHastighet.value;
            this.heroItems.maxVindItem = item;
        }
        if(item.vindHastighet.value < calmest){
            calmest = item.vindHastighet.value;
            this.heroItems.minVindItem = item;
        }

        // kollar om nederbörd, lägger i egen array för speclialanalys längre ner
        if(item.nederbord){
            nederbordItems.push(item);
        }

        // skapar ett objekt med egenskapsnamn efter datum (associativ array) och lagrar en array med items för den dagen där
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

        // samlar nederbördsinfo
        if (item.nederbord && item.nederbordMangd.value > wetest) {
            wetest = item.nederbordMangd.value;
            this.heroItems.maxNederbordItem = item;
        }
        if (item.nederbord && item.nederbordMangd.value < dryest) {
            dryest = item.nederbordMangd.value;
            this.heroItems.minNederbordItem = item;
        }

        // registrerar första nederbörden
        if(item.nederbord && !this.heroItems.startNederbordItem){
            this.heroItems.startNederbordItem = item;
        }

        // registrerar första ej nederbörd efter första nederbörd (nederbörd slut)
        if(!item.nederbord && this.heroItems.startNederbordItem && !this.heroItems.endNederbordItem){
            this.heroItems.endNederbordItem = item;
        }

    }

    // kollar om nederbör pågår, tar då bort första nederbörden.
    if(this.heroItems.nowItem.nederbord){
        this.heroItems.startNederbordItem = null;
    }

    // Skapar dataDays-objekt från dayItems-arrayn skapad i huvudloopen ovan och sparar i dataDays
     for(dayIndex in dayItems){
         var day = new ForecastDay();
         day.addItems(dayItems[dayIndex]); // lägger till hela arrayn med items för samma dag
         this.dataDays.push(day);
     }

    //console.log("HERO ITEMS");
    //console.log(this.heroItems);
};

/**
 * Returnerar data item närmast tiden
 * @param {Date} dateObj
 * @returns {ForecastDataItem}
 */
ForecastDataset.prototype.getClosestItem = function(dateObj){
    var date = dateObj || new Date();
    var serial = date.getTime();
    var items = this.dataItems.slice(); // kopierar för omsortering

    items.sort(function(a, b){
        return Math.abs(1 - a.timeserial / serial) - Math.abs(1 - b.timeserial / serial);
    });

    //console.log("LETAR närmast till - "+ date);
    //console.log("HITTADE - "+ items[0].dateobject);
    //console.log(items);

    return items[0];
};