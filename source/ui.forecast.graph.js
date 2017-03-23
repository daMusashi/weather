/**
 * Created by Martin on 2015-12-13.
 */

/**
 * Manager för kommande-data i next-panelen
 * @param {Array} classesArray - En array med extra-klasser
 * @constructor
 */
function UiForecastGraph(classesArray){

    var classes = classesArray || [];

    this.box = new UiPanel("graph-container", classes);
    $(this.box).addClass("ui-container");
    this.box.setHeader("Diagram");

    this.chart = new D3Chart(this.box.content);
}

UiForecastGraph.prototype.update = function(dataset){
    //this.box.clear();
    this.chart.vizDaysTempNederbord(dataset);




};

UiForecastGraph.prototype.getDOM = function(){
    return this.box.getDOM();
};
