/**
 * Created by Martin on 2015-12-11.
 */
function SMHIForecastAPIDataItem(datetimeUTC, itemParameters){
    //console.log(itemParameters);
    this.datetimeRawUTC = datetimeUTC;
    this.dateobject = new Date(datetimeUTC);
    this.date = this.dateobject.getDateString();
    this.time = this.dateobject.getTimeString();
    var idBase = this.date + this.time;
    this.id = idBase.replace(/\D/g,'');
    this.day = this.dateobject.getDayName();

    this.temp = null;
    this.sikt = null;
    this.vindRiktning = null;
    this.vindHastighet = null;
    this.vindByarHastighet = null;
    this.nederbord = null;
    this.nederbordMangd = null;
    this.nederbordMangdMax = null;
    this.nederbordMangdMin = null;
    this.molnighet = null;
    this.lufttryck = null;
    this.luftfuktighet = null;
    this.askSannolikhet = null;
    this.vind = null;

    this.data = [];

    for(var i = 0; i < itemParameters.length; i++){
        var item = itemParameters[i];
        // , datetime, temp, rain, snow, windStrengh, windDirection, lCloud, mCloud, hCloud, thunder
        switch(item.name){
            case "t": // Lufttemperatur på 2 meters höjd över marken
                this.temp = new SMHIForecastAPIDataParameter("Temperatur", Math.round(item.values[0]), item.unit);
                this.data.push(this.temp);
                break;
            case "vis": // Horisontell sikt på 10 meters höjd över havet, max 50?
                this.sikt = new SMHIForecastAPIDataParameter("Sikt", item.values[0], item.unit);
                this.data.push(this.sikt);
                break;
            case "wd": // wind direction grader
                var windDircetionDegrees = item.values[0];
                var cardinalDirections = [
                    ['N', 337.5, 22.5],
                    ['NE', 22.5, 67.5],
                    ['E', 67.5, 112.5],
                    ['SE', 112.5, 157.5],
                    ['S', 157.5, 202.5],
                    ['SW', 202.5, 247.5],
                    ['W', 247.5, 292.5],
                    ['NW', 292.5, 337.5]
                ];

                var direction;
                for(var dir in cardinalDirections) {
                    if (windDircetionDegrees >= dir[1] && windDircetionDegrees < dir[2]) {
                        direction = dir[0];
                        break;
                    }
                }
                this.vindRiktning = new SMHIForecastAPIDataParameter("Vindriktning", windDircetionDegrees, item.unit, this.vindriktningToString(windDircetionDegrees));
                this.data.push(this.vindRiktning);
                break;
            case "ws": // wind speed
                this.vindHastighet = new SMHIForecastAPIDataParameter("Vindhastighet", item.values[0], item.unit, this.vindHastighetToString(item.values[0]));
                this.data.push(this.vindHastighet);
                break;
            case "gust": // Byvindhastighet på 10 meters höjd över marken
                this.vindByarHastighet = new SMHIForecastAPIDataParameter("Byvindhastighet", item.values[0], item.unit, this.vindHastighetToString(item.values[0]));
                this.data.push(this.vindByarHastighet);
                break;
            case "hmsl": // Mean sea level pressure. Lufttryck omräknat till havsytans nivå
                this.lufttryck = new SMHIForecastAPIDataParameter("Lufttryck", item.values[0], item.unit);
                this.data.push(this.lufttryck);
                break;
            case "r": // Relativ luftfuktighet på 2 meters höjd över marken
                this.luftfuktighet = new SMHIForecastAPIDataParameter("Luftfuktighet", item.values[0], item.unit);
                this.data.push(this.luftfuktighet);
                break;
            case "tstm": // Sannolikhet för åska [%]
                this.askSannolikhet = new SMHIForecastAPIDataParameter("Sannolikhet för åska", item.values[0], item.unit);
                this.data.push(this.askSannolikhet);
                break;
            case "tcc_mean": // total molnighet octas (finns också uppdelad low, med, high)
                var cover = item.values[0];
                var tolkning;
                switch(cover) {
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
                this.molnighet = new SMHIForecastAPIDataParameter("Molnighet", cover, item.unit, tolkning);
                this.data.push(this.molnighet);
                break;
            case "pcat": // nederbördstyp
                var cat = item.values[0];
                var tolkning;
                switch(cat){
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
                        cat = 0;
                }
                this.nederbord = new SMHIForecastAPIDataParameter("Nederbörd", cat, item.unit, tolkning);
                this.data.push(this.nederbord);
                break;
            case "pmean": // medel av nederbördsintensitet i kg/m2/h, kan användas som mm/h, se http://www.smhi.se/kunskapsbanken/meteorologi/hur-mats-nederbord-1.637
                //this.nederbordMangd = new SMHIForecastAPIDataParameter("Nederbördsintensitet (medel)", item.values[0], item.unit);
                this.nederbordMangd = new SMHIForecastAPIDataParameter("Nederbördsintensitet (medel)", item.values[0], "mm");
                this.data.push(this.nederbordMangd);
                //console.log("nedmängd (medel): "+this.nederbordMangd);
                break;
            case "pmax": // medel av nederbördsintensitet
                this.nederbordMangdMax = new SMHIForecastAPIDataParameter("Nederbördsintensitet (max)", item.values[0], item.unit);
                this.data.push(this.nederbordMangdMax);
                //console.log("nedmängd (max): "+this.nederbordMangdMax);
                break;
            case "pmin": // medel av nederbördsintensitet
                this.nederbordMangdMin = new SMHIForecastAPIDataParameter("Nederbördsintensitet (min)", item.values[0], item.unit);
                this.data.push(this.nederbordMangdMin);
                break;
        }

    }

    this.vind = this.vindHastighet.value + " " + this.vindHastighet.unit + " " + this.vindriktningToString(this.vindRiktning.value) + "("+this.vindRiktning.value+")";
}

SMHIForecastAPIDataItem.prototype.vindriktningToString = function(degree){
    //var val = Math.round((degree/45)+.5);
    var val = Math.round((degree/45));
    //console.log(val);
    arr=["N", "NO", "O", "SO", "S", "SV", "V" ,"NV"];
    return arr[(val % 8)] + "("+degree+")";
};

SMHIForecastAPIDataItem.prototype.vindHastighetToString = function(hastighet){
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

SMHIForecastAPIDataItem.prototype.toString = function(){
    var out = "<DATA ["+this.date+"|"+this.time+"] ";
    for(var i = 0; i < this.data.length; i++){
        var param = this.data[i];
        out += param.toString() + " ";
    }
    out += ">";
    return out;
};

function SMHIForecastAPIDataParameter(label, value, unit, tolkning){
    this.label = label;
    this.value = value;
    this.unit = unit || "?";
    this.tolkning = tolkning || "";
}

SMHIForecastAPIDataParameter.prototype.toString = function(){
    var tolkning;
    if(this.tolkning != ""){
        tolkning = "("+this.tolkning+")";
    } else {
        tolkning = "";
    }
    return this.label+":"+this.value+this.unit+tolkning;
};