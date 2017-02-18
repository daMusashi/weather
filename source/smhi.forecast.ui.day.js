/**
 * Created by Martin on 2015-12-11.
 *
 * Klassen antar att alla items som lägs till tillhör samma dag som den initeras med via date-object
 * Sortering för att lägga till rätt dataItem får ske utanför klassen
 */
function SMHIForecastDayUI(id, classesArray){
    this._data = null;

    var htmlId = id || "wp-"+Math.floor((Math.random() * 100) + 1)+"-"+Math.floor((Math.random() * 100) + 1)+"-"+Math.floor((Math.random() * 100) + 1);
    var classes = classesArray || [];
    //classes.push("day-box");

    this.box = new UIWeatherPanel(htmlId, classes);
}

SMHIForecastDayUI.prototype.update = function(dayDataobject){
    this._data = dayDataobject;

    this.box.clear();
    this.box.setHeader(this._data.day, this._data.date);

    var id = this._data.date.replace(/\D+/g, '');

    if(this._data.daytimeItem) {
        var daytimeHeroUI = new SMHIForecastUIDataItemBig(this._data.daytimeItem);
        var daytimeListUI = new SMHIForecastUIDataItemList(this._data.dayItems);
        var div = document.createElement("div");
        div.appendChild(daytimeHeroUI);
        div.appendChild(daytimeListUI);
        this.box.addPanel(div, "Dag", "day");
    }

    if(this._data.nighttimeItem) {
        var nighttimeHeroUI = new SMHIForecastUIDataItemBig(this._data.nighttimeItem);
        var nighttimeListUI = new SMHIForecastUIDataItemList(this._data.nightItems);
        var div = document.createElement("div");
        div.appendChild(nighttimeHeroUI);
        div.appendChild(nighttimeListUI);
        this.box.addPanel(div, "Natt", "night");
    }

    /*if(this.data.items.length > 0) {
        //var listUI = this.getItemListDOM();
        var listUI = new SMHIForecastUIDataItemList(this.data.items);
        this.box.addPanel(listUI, "Lista", "list", ["multi-item"])
    }*/



    // markerar helg
    if(this._data.isWeekend){
        this.box.addClass("weekend");
    } else {
        this.box.removeClass("weekend");
    }

    // sätter förvald
    if(this._data.daytimeItem){
        this.box.showPanel("day");
    } else {
        this.box.showPanel("list");
    }


}



SMHIForecastDayUI.prototype.getDOM = function(){
    return this.box.getDOM();

};



