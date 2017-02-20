/**
 * Created by Martin on 2015-12-11.
 *
 * Klassen antar att alla items som lägs till tillhör samma dag som den initeras med via date-object
 * Sortering för att lägga till rätt dataItem får ske utanför klassen
 */

/**
 * Håller DOM för en dag UI. Datan för dagen, {@link ForecastDay}, är inte fast hållen utan uppdateras med update(). Dvs DOM'en ligger hela tiden kvar, men datan, dagen, ändras.
 * @param {string} id - HTML-id för containern
 * @param {Array} classesArray - Klasser att sätta på containern
 * @constructor
 */
function UiForecastDay(id, classesArray){
    this._data = null;

    var htmlId = id || "weatherday-"+Math.floor((Math.random() * 100) + 1)+"-"+Math.floor((Math.random() * 100) + 1)+"-"+Math.floor((Math.random() * 100) + 1);
    var classes = classesArray || [];
    //classes.push("day-box");

    this.box = new UiPanel(htmlId, classes);
}

/**
 * Uppdaterar dag-DOM:en med ny dag-data
 * @param {ForecastDay} dayDataobject
 */
UiForecastDay.prototype.update = function(dayDataobject){
    this._data = dayDataobject;

    this.box.clear();
    this.box.setHeader(this._data.day, this._data.date);

    var id = this._data.date.replace(/\D+/g, '');

    if(this._data.dayItem) {
        var dayHeroUI = new UiDataItem(this._data.dayItem);
        var dayHeroDOM = dayHeroUI.getBigDOM();
        this.box.append(dayHeroDOM);
    }

    var ul = $("<ul>");
    $(ul).addClass("weather-item-list");
    $(ul).addClass("list");
    $(ul).addClass("hide");
    for(var i = 0; i < this._data.items.length; i++) {
        //var listUI = this.getItemListDOM();
        var itemUI = new UiDataItem(this._data.items[i]);
        $(ul).append(itemUI.getListItemDOM());
    }
    this.box.append(ul);



    // markerar helg
    if(this._data.isWeekend){
        this.box.addClass("weekend");
    } else {
        this.box.removeClass("weekend");
    }


};

/**
 * Hämtar ut DOM:en
 * @returns {Element|*}
 */
UiForecastDay.prototype.getDOM = function(){
    return this.box.getDOM();

};



