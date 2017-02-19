/**
 * Created by Martin on 2015-12-11.
 */

/**
 * "Weahter item" huvudobjekt för datan - All väderdata för en viss tidpunkt
 * @param {string} datetimeUTC - En tidpunkt beskriven i UTC
 * @constructor
 */
function ForecastDataItem(datetimeUTC){
    /**
     * Tidsobjekt för vilken datan gäller
     * @type {Date}
     */
    this.dateobject = new Date(datetimeUTC);
    /**
     * Datum för vilken datan gäller
     * @type {string}
     */
    this.date = this.dateobject.getDateString();;
    /**
     * Klockslag för vilken datan gäller
     * @type {string}
     */
    this.time = this.dateobject.getTimeString();
    /**
     * Veckodagsnamnet för datan gäller
     * @type {string}
     */
    this.day = this.dateobject.getDayName();

    var idBase = this.date + this.time;
    /**
     * Ett unikt id för data itemet
     * @type {string}
     */
    this.id = idBase.replace(/\D/g,'');



    //* PARAMETERS *//
    /**
     * Temperatur. Lufttemperatur på 2 meters höjd över marken (SMHI)
     * @type {ForecastDataItemParameter}
     */
    this.temp = new ForecastDataItemParameter("Temperatur");
    /**
     * Sikt. Horisontell sikt på 10 meters höjd över havet, max 50? (SMHI)
     * @type {ForecastDataItemParameter}
     */
    this.sikt = new ForecastDataItemParameter("Sikt");
    /**
     * Vindriktning. Grader, tolkning kardinell (N, NV, O osv)
     * @type {ForecastDataItemParameter}
     */
    this.vindRiktning = new ForecastDataItemParameter("Vindriktning");
    /**
     * Vindhastighet. m/s, tolkning "svag", "måttlig", "kuling" etc.
     * @type {ForecastDataItemParameter}
     */
    this.vindHastighet = new ForecastDataItemParameter("Vindhastighet");
    /**
     * Vindhastighet i byar. m/s, tolkning "svag", "måttlig", "kuling" etc.
     * @type {ForecastDataItemParameter}
     */
    this.vindByarHastighet = new ForecastDataItemParameter("Byvindhastighet");
    /**
     * Nederbördstyp. Branschkod, tolkning "regn", "snö" etc.
     * @type {ForecastDataItemParameter}
     */
    this.nederbord = new ForecastDataItemParameter("Nederbörd");
    /**
     * Nederbördsmängd. Medel av nederbördsintensitet i kg/m2/h, kan översättas som mm/h, se http://www.smhi.se/kunskapsbanken/meteorologi/hur-mats-nederbord-1.637, tolkning "regn", "snö" etc.
     * @type {ForecastDataItemParameter}
     */
    this.nederbordMangd = new ForecastDataItemParameter("Nederbördsintensitet (medel)");
    /**
     * Nederbördsmängd. Max för medelmängden (se nederbord)
     * @type {ForecastDataItemParameter}
     */
    this.nederbordMangdMax = new ForecastDataItemParameter("Nederbördsintensitet (max)");
    /**
     * Nederbördsmängd. Min för medelmängden (se nederbord)
     * @type {ForecastDataItemParameter}
     */
    this.nederbordMangdMin = new ForecastDataItemParameter("Nederbördsintensitet (min)");
    /**
     * Molnighet. Octas, tolkning "mulet", "halvklart" etc.
     * @type {ForecastDataItemParameter}
     */
    this.molnighet = new ForecastDataItemParameter("Molnighet");
    /**
     * Luftryckt. Lufttryck omräknat till havsytans nivå
     * @type {ForecastDataItemParameter}
     */
    this.lufttryck = new ForecastDataItemParameter("Lufttryck");
    /**
     * Luftfuktighet. Relativ luftfuktighet på 2 meters höjd över marken (%)
     * @type {ForecastDataItemParameter}
     */
    this.luftfuktighet = new ForecastDataItemParameter("Luftfuktighet");
    /**
     * Sannolikhet för åska. (%)
     * @type {ForecastDataItemParameter}
     */
    this.askSannolikhet = new ForecastDataItemParameter("Sannolikhet för åska");



    //* Generererade params Ä//
    /**
     * Vinddatan sammanskriven i en sträng
     * @type {string}
     */
    this.vind = "";

    /**
     * Lagrar alla värde-parametrar för iteration av andra objekt.
     * @type {Array}
     */
    this.data = [];


}

/**
 * Läser alla råvärden och skapar tolkningar, t.ex vindriktningar till "S", "SV" och vindhastigheter till "stark", "svag" etc.
 * Gäller generella tolkningar. Tolkningar knytna till data provider sker i adaptern.
 */
ForecastDataItem.prototype.decodeValues = function(){
    var tolkning;
    // vind riktning: degress -> cardinal (N, O, S, V etc.)
    this.vindRiktning.tolkning = this._vindriktningToString(this.vindRiktning.value);
    // vind hastighet: m/s -> ord
    this.vindHastighet.tolkning = this._vindHastighetToString(this.vindHastighet.value);
    this.vindByarHastighet.tolkning = this._vindHastighetToString(this.vindByarHastighet.value);
    this.vind = this.vindHastighet.value + " " + this.vindHastighet.unit + " " + this._vindriktningToString(this.vindRiktning.value) + "(" + this.vindRiktning.value + ")";
    // molnighet: octas -> ord
    switch(this.molnighet.value) {
        case 1:
        case 2:
            tolkning = "Mestadels klart";
            break;
        case 3:
        case 4:
        case 5:
            tolkning = "Halvklart";
            break;
        case 6:
        case 7:
            tolkning = "Nästan mulet";
            break;
        case 8:
            tolkning = "Mulet";
            break;
        default:
            cover = 0;
            tolkning = "Klart";
    }
    this.molnighet.tolkning = tolkning;
    // nedbördstyp
    switch (this.nederbord.value) {
        case 1:
            tolkning = "Snö";
            break;
        case 2:
            tolkning = "Snöblandat regn";
            break;
        case 3:
            tolkning = "Regn";
            break;
        case 4:
            tolkning = "Duggregn"; // drizzle
            break;
        case 5:
            tolkning = "Underkylt regn";
            break;
        case 6:
            tolkning = "Underkylt duggregn";
            break;
        default:
            tolkning = "";
    }
    this.nederbord.tolkning = tolkning;
};

ForecastDataItem.prototype._vindriktningToString = function(degree){
    //var val = Math.round((degree/45)+.5);
    var val = Math.round((degree/45));
    //console.log(val);
    arr=["N", "NO", "O", "SO", "S", "SV", "V" ,"NV"];
    return arr[(val % 8)] + "("+degree+")";
};

ForecastDataItem.prototype._vindHastighetToString = function(hastighet){
    // tolkningar från http://www.smhi.se/kunskapsbanken/meteorologi/skalor-for-vindhastighet-1.252
    var tolkning = "Vindstilla";
    if(hastighet >= 0.3){
        tolkning = "Svag vind";
    }
    if(hastighet >= 3.4){
        tolkning = "Måttlig vind";
    }
    if(hastighet >= 8){
        tolkning = "Frisk vind";
    }
    if(hastighet >= 13.9){
        tolkning = "Hård vind";
    }
    if(hastighet >= 24.5){
        tolkning = "Storm!";
    }
    if(hastighet >= 32.7){
        tolkning = "ORKAN!!!";
    }

    return tolkning;
};

ForecastDataItem.prototype.toString = function(){
    var out = "<DATA ["+this.date+"|"+this.time+"] ";
    for(var i = 0; i < this._data.length; i++){
        var param = this._data[i];
        out += param.toString() + " ";
    }
    out += ">";
    return out;
};