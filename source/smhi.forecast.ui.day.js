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

    this.box = new UiPanel(htmlId, classes);
}

SMHIForecastDayUI.prototype.update = function(dayDataobject){
    this._data = dayDataobject;

    this.box.clear();
    this.box.setHeader(this._data.day, this._data.date);

    var id = this._data.date.replace(/\D+/g, '');

    if(this._data.daytimeItem) {
        var daytimeHeroUI = new UiDataItem(this._data.daytimeItem);
        var daytimeHeroDOM = daytimeHeroUI.getBigDOM();
        var daytimeListDOM = daytimeHeroUI.getListItemDOM();
        var div = document.createElement("div");
        div.appendChild(daytimeHeroDOM);
        div.appendChild(daytimeListDOM);
        this.box.addPanel(div, "Dag", "day");
    }

    if(this._data.nighttimeItem) {
        var nighttimeHeroUI = new UiDataItem(this._data.daytimeItem);
        var nighttimeHeroDOM = nighttimeHeroUI.getBigDOM();
        var nighttimeListDOM = nighttimeHeroUI.getListItemDOM();
        var div = document.createElement("div");
        div.appendChild(nighttimeHeroDOM);
        div.appendChild(nighttimeListDOM);
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



