/**
 * Created by Martin on 2015-12-11.
 */


/**
 * Håller väder data som hör till samma dag
 * @constructor
 */
function ForecastDay(){
    this.date = null;
    this.day = null;
    this.isWeekend = null;

    this.items = [];

    this.dayHeroHour = 13; // SMHI
    this.nightHeroHour = 1; // SMHI

    this.dayItem = null; // vid this.dayHeroHour
    this.nightItem = null; // vid this.nightHeroHour

    this.dayTemp = null; // från this.dayItem
    this.nightTemp = null; // från this.nightItem
    this.maxTemp = null;
    this.minTemp = null;
    this.medelTemp = null;

    this.nederbord = false;
    this.totalNederbord = 0;
}

ForecastDay.prototype.process = function(){
    if(this.items.length > 0) {
        this.date = this.items[0].dateobject.getDateString();
        this.day = this.items[0].dateobject.getDayName();
        this.isWeekend = this.items[0].dateobject.isWeekend();

        this.dayItem = null; // 13.00 SMHI
        this.nightItem = null; // 01.00 SMHI

        var hottest = -100;
        var coldest = 100;
        var totalTemp = 0;
        for (i = 0; i < this.items.length; i++) {

            var item = this.items[i];

            var hour = this.items[i].dateobject.getHours();

            // hero day item
            if (hour == this.dayHeroHour) {
                this.dayItem = item;
            } else if(hour >= this.dayHeroHour-1 && hour <= this.dayHeroHour+1){ // leta omkring
                this.dayItem = item;
            }

            // hero night item
            if (hour == this.nightHeroHour) {
                this.nightItem  = item;
            } else if(hour >= this.nightHeroHour-1 && hour <= this.nightHeroHour+1){ // leta omkring
                this.nightItem  = item;
            }


            if(item.temp.value > hottest){
                hottest = item.temp.value;
                this.maxTemp = item.temp.value;
            }

            if(item.temp.value < coldest){
                coldest = item.temp.value;
                this.minTemp = item.temp.value;
            }

            this.totalNederbord += item.nederbordMangd.value;
            totalTemp += item.temp.value;

            if(item.nederbord){
                this.nederbord = true;
            }
        }

        if(this.dayItem && this.nightItem && this.items.length > 3){
            this.medelTemp = totalTemp / this.items.length;
        }
    }

}

ForecastDay.prototype.addItem = function(dataItem){
    this.items.push(dataItem);
};

ForecastDay.prototype.addItems = function(dataItemsArray){
    for(var i = 0; i < dataItemsArray.length; i++) {
        this.addItem(dataItemsArray[i], false);
    }

    this.process();
};

ForecastDay.prototype.clear = function(){
    this.items = [];
}





