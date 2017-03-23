/**
 * Created by Martin on 2017-02-21.
 */
function UiForecastDaysPanel(){

    this.dayBoxes = [];

    this.box = document.createElement("div");
    $(this.box).attr("id", "days-container");
    $(this.box).addClass("ui-container");

    // lägger till dagar
    for(var i = 0; i < CONFIG.maxDays; i++){
        this.dayBoxes[i] = new UiForecastDay("day-box-"+i, ["day-box"]);
        this.box.appendChild(this.dayBoxes[i].getDOM());
    }
}

UiForecastDaysPanel.prototype.update = function(dataset){
    // Uppdaterar dayBoxes med dayObjects
    for(day in dataset.dataDays){
        var dayBox = this.dayBoxes[day];
        var dayData = dataset.dataDays[day];
        dayBox.update(dayData);
    }
};

UiForecastDaysPanel.prototype.getDOM = function(){
    return this.box;
};