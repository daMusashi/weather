/**
 * Created by Martin on 2015-12-11.
 *
 * Klassen antar att alla items som lägs till tillhör samma dag som den initeras med via date-object
 * Sortering för att lägga till rätt dataItem får ske utanför klassen
 */
function SMHIForecastDayUI(id, classesArray){
    this.data = null;

    var htmlId = id || "wp-"+Math.floor((Math.random() * 100) + 1)+"-"+Math.floor((Math.random() * 100) + 1)+"-"+Math.floor((Math.random() * 100) + 1);
    var classes = classesArray || [];
    //classes.push("day-box");

    this.box = new UIWeatherPanel(htmlId, classes);
}

SMHIForecastDayUI.prototype.update = function(dayDataobject){
    this.data = dayDataobject;

    this.box.clear();
    this.box.setHeader(this.data.day, this.data.date);

    var id = this.data.date.replace(/\D+/g, '');

    if(this.data.daytimeItem) {
        var daytimeHeroUI = new SMHIForecastUIDataItemBig(this.data.daytimeItem);
        var daytimeListUI = new SMHIForecastUIDataItemList(this.data.dayItems);
        var div = document.createElement("div");
        div.appendChild(daytimeHeroUI);
        div.appendChild(daytimeListUI);
        this.box.addPanel(div, "Dag", "day");
    }

    if(this.data.nighttimeItem) {
        var nighttimeHeroUI = new SMHIForecastUIDataItemBig(this.data.nighttimeItem);
        var nighttimeListUI = new SMHIForecastUIDataItemList(this.data.nightItems);
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
    if(this.data.isWeekend){
        this.box.addClass("weekend");
    } else {
        this.box.removeClass("weekend");
    }

    // sätter förvald
    if(this.data.daytimeItem){
        this.box.showPanel("day");
    } else {
        this.box.showPanel("list");
    }


}



SMHIForecastDayUI.prototype.getDOM = function(){
    return this.box.getDOM();

};



