/**
 * Created by Martin on 2015-12-11.
 */


/**
 * Håller väder data som hör till samma dag
 * @constructor
 */
function ForecastDay(){
    this.daytimeHours = {min: 8, max: 20};
    this.daytimeRepresentationHours = {min: 13, max: 14};

    this.nighttimeHours = {min: 21, max: 7};
    this.nighttimeRepresentationHours = {min: 1, max: 2};

    this.date = null;
    this.day = null;
    this.isWeekend = null;

    this.items = [];
    this.dayItems = [];
    this.nightItems = [];

    this.daytimeItem = null;
    this.nighttimeItem = null;

    this.maxTemp = null;
    this.minTemp = null;


}

ForecastDay.prototype._update = function(){
    if(this.items.length > 0) {
        this.date = this.items[0].dateobject.getDateString();
        this.day = this.items[0].dateobject.getDayName();
        this.isWeekend = this.items[0].dateobject.isWeekend();

        this.dayItems = []; // reset
        this.nightItems = []; // reset

        //console.log(this.date);
        //console.log(this.items);

        this.daytimeItem = null;
        this.nighttimeItem = null;

        for (i = 0; i < this.items.length; i++) {

            var hour = this.items[i].dateobject.getHours();

            // day items
            if (hour >= this.daytimeHours.min && hour <= this.daytimeHours.max) {
                this.dayItems.push(this.items[i]);
            }

            // night items
            if (hour >= this.nighttimeHours.min || hour <= this.nighttimeHours.max) {
                this.nightItems.push(this.items[i]);
            }

            // hero day item
            if (hour >= this.daytimeRepresentationHours.min && hour <= this.daytimeRepresentationHours.max) {
                this.daytimeItem = this.items[i];
            }

            // hero night item
            if (hour >= this.nighttimeRepresentationHours.min && hour <= this.nighttimeRepresentationHours.max) {
                this.nighttimeItem = this.items[i];
            }
        }
    }

}

ForecastDay.prototype.addItem = function(dataItem, doUpdate){
    var update = doUpdate || true;

    this.items.push(dataItem);

    if(update) {
        this._update();
    }

};

ForecastDay.prototype.addItems = function(dataItemsArray){
    for(var i = 0; i < dataItemsArray.length; i++) {
        this.addItem(dataItemsArray[i], false);
    }

    this._update();
};

ForecastDay.prototype.clear = function(){
    this.items = [];
}





