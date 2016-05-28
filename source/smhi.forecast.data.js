/**
 * Created by Martin on 2015-12-11.
 */
function SMHIForecastAPIData(approvedTime, place){

    this.approvedTime = new Date(approvedTime);
    this.place = place || null;
    //console.log("data för plats: "+place);

    this.weatherItems = []; // alla weather-items (bara forecast, innan aktuell tid borttagna)
    this.weatherDays = []; // arrays dayItems
}

SMHIForecastAPIData.prototype.addDataItem = function(datetimeUTC, itemParameters){
    //console.log("Lägger till data-item");
    //console.log(itemParameters);
    this.weatherItems.push(new SMHIForecastAPIDataItem(datetimeUTC, itemParameters));
    //console.log(this.weatherItems.length);
};

// när alla items lagts till - skapa lämpliga datastrukturer
SMHIForecastAPIData.prototype.process = function(){

    // skapar waetherDays
    var dayItems = [];
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
        var day = new SMHIForecastDay();
        day.addItems(dayItems[dayIndex]);
        this.weatherDays.push(day);
    }
};

// returnerar dataItem närmast givet datetime
SMHIForecastAPIData.prototype.getClosestItem = function(dateObj){
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