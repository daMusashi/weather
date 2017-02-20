/**
 * Created by Martin on 2015-12-12.
 */
function SMHIForecastUI(){
    this.nextItemsContainer = document.getElementById(CONFIG.nextPanelContainerId);
    this.dayItemsContainer = document.getElementById(CONFIG.daysPanelContainerId);

    this.vizContainerId = "viz-container";

    this.dayItems = [];
    this.dayBoxes = [];
    this.rightnowBox = null;
    this.laterBoxes = [];

    this._buildUI();

    this.viz = new D3Linechart(this.nextItemsContainer.id);
    $(this.viz.dom).addClass("flex-5");
}

SMHIForecastUI.prototype._buildUI = function(){
    for(var i = 0; i < CONFIG.maxDays; i++){
        this.dayBoxes[i] = new UiForecastDay("day-box-"+i, ["day-box"]);
        this.dayItemsContainer.appendChild(this.dayBoxes[i].getDOM());
    }

    this.rightnowBox = new UiForecastNextInfo();
    this.nextItemsContainer.appendChild(this.rightnowBox.getDOM());

    //var div = document.createElement("div");
    //$(div).addClass("flex-5");
    //$(div).attr("id", this.vizContainerId);
    //this.nextItemsContainer.appendChild(div);

    /*for(var j = 0; j < 4; j++){
        this.laterBoxes[j] = new UiPanel(["hero-box", "hero-box-"+(j+1)]);
        this.laterBoxes[j].setId = "hero-box-"+j;
        this.nextItemsContainer.appendChild(this.laterBoxes[j].getDOM());
    }*/

}

SMHIForecastUI.prototype.update = function(dataset){
    //me = me || this;

    console.log("Forecast UI Manager: update...");
    //console.log(data);

    this.rightnowBox.update(dataset.heroItems);
    //this.viz.vizTemp(data);

    /*if(me.listener) {
        if (me.listenerSource) {
            me.listener.call(me.listenerSource, data, me.listenerSource);
        } else {
            me.listener(data);
        }
    }*/

    var laterBoxContent = [];

    /*var nowItem = data.getClosestItem();
    var nowItemDOM = new SMHIForecastUIDataItemHero(nowItem);

    var time = new Date();
    time.setHours(time.getHours() + 2); // +2
    var nextItem = data.getClosestItem(time);
    var nextItemDOM = new SMHIForecastUIDataItemHero(nextItem);

    time = new Date();
    time.setHours(time.getHours() + 6); // +6
    var laterItem = data.getClosestItem(time);
    var laterItemDOM = new SMHIForecastUIDataItemHero(laterItem);

    time = new Date();
    time.setHours(time.getHours() + 12); // +12
    var forwardItem = data.getClosestItem(time);
    var forwardItemDOM = new SMHIForecastUIDataItemHero(forwardItem);

    var now = new Date();

    var nowDiff = now.diff(nowItem.dateobject);
    if(nowDiff.getTotalMinutesDiff() < 0){
        nowTime = nowDiff.getTotalMinutesDiff()+" minuter";
    } else {
        nowTime = "+"+nowDiff.getTotalMinutesDiff()+" minuter";
    }
    var nextDiff = now.diff(nextItem.dateobject);
    var laterDiff = now.diff(laterItem.dateobject);
    var forwardDiff = now.diff(forwardItem.dateobject);*/

    /*
    this.laterBoxes[0].clear();
    this.laterBoxes[0].append(nowItemDOM);
    this.laterBoxes[0].setHeader("Nu", nowTime);


    this.laterBoxes[1].clear();
    this.laterBoxes[1].append(nextItemDOM);
    this.laterBoxes[1].setHeader("+"+nextDiff.getTotalHours()+" timmar", nextItem.day + " " + nextItem.time);

    this.laterBoxes[2].clear();
    this.laterBoxes[2].append(laterItemDOM);
    this.laterBoxes[2].setHeader("+"+laterDiff.getTotalHours()+" timmar", laterItem.day + " " + laterItem.time);

    this.laterBoxes[3].clear();
    this.laterBoxes[3].append(forwardItemDOM);
    this.laterBoxes[3].setHeader("+"+forwardDiff.getTotalHours()+" timmar", forwardItem.day + " " + forwardItem.time);
    */

    // Uppdaterar dayBoxes med dayObjects
    for(day in dataset.dataDays){
        var dayBox = this.dayBoxes[day];
        var dayData = dataset.dataDays[day];
        dayBox.update(dayData);
    }

};