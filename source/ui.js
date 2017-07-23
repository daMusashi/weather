/**
 * Created by Martin on 2015-12-18.
 */
/**
 * Manager för UI:n
 * @constructor
 */
function UiManager(){
    /**
     * Håller radarbild
     * @type {UiSMHIRadar}
     */
    this.radar = null;

    this.header = new UiHeader();
    this.nextBox = new UiForecastNextInfo();
    this.daysBox = new UiForecastDaysPanel();
    this.graphBox = new UiForecastGraph();
    this.footer = new UiFooter();

    //this.viz = new D3Chart();
}

UiManager.prototype.init = function() {

    this.radar = new UiSMHIRadar(document.getElementById(CONFIG.radarContainerId));

    // lägger till header
    document.getElementById(CONFIG.headerContainerId).appendChild(this.header.getDOM());
    // lägger till next
    document.getElementById(CONFIG.nextContainerId).appendChild(this.nextBox.getDOM());
    // lägger till days
    document.getElementById(CONFIG.daysContainerId).appendChild(this.daysBox.getDOM());
    // lägger till graph
    document.getElementById(CONFIG.graphContainerId).appendChild(this.graphBox.getDOM());
    // lägger till footer
    document.getElementById(CONFIG.footerContainerId).appendChild(this.footer.getDOM());

};

UiManager.prototype.update = function(dataset){
    console.log("UI Manager: update with dataset...");
    console.log(dataset);

    this.daysBox.update(dataset);
    this.nextBox.update(dataset.heroItems);
    this.header.update(dataset);
    this.graphBox.update(dataset);

    this.radar.update();
};


UiManager.prototype.manageLayout = function(){
    console.log("Weather: UI manginging layout & sizes");

    // radar - behöver beräknas och ändras i JS, då canvasen behöver skalas med JS, räcker inte med CSS
    //var radarDim = this.radar.calcAndSetDimension();

    //$("#panel-radar").width(radarDim.width + buttonWidth);
    //$("#panel-radar").css("right", radarDim.width);
    //$("#panel-radar").css("right", 0);
    //$("#radar-wrapper").width(radarDim.width);
    //this.radar.setDimension(radarDim);

};

UiManager.prototype.responsify = function() {
    //var width = $(document).outerWidth(true);
    //var height = $(document).outerHeight(true);

    /*
     Weather-list weather items scroll elements
     * lg - alla tio > 1200
     * sm - 2 * 5 elem > 768
     * x-sm - 5 * 2 elem > 468
     * mindre än x-sm - 10 * 1 elem  < 480
     */

    /* var query = "#weather-list .weather-item";
     var wrap = '<div class="scroll-area">';

     var items = $("#weather-list").children();
     var mod = 1;
     if (width > 480) {
     mod = 2;
     }
     if (width > 768) {
     mod = 5;
     }
     if (width > 1200) {
     mod = 10;
     }

     // height > 920 två rader och ingen scroller på weather-list

     var itemGroupIndex = 0;
     console.log("mod "+mod);
     console.log("width "+width);
     console.log("height "+height);

     for(var i = 0; i < items.length; i++){
     var item = items[i];

     if (i % mod == 0) {
     itemGroupIndex++;
     }
     $(item).addClass('group');
     $(item).addClass('group-'+itemGroupIndex);
     $(item).addClass('cols-'+mod);
     }

     for(var j = 1; j <= itemGroupIndex; j++){
     console.log('#weather-list group-'+j);
     $('#weather-list .group-'+j).wrapAll(wrap);
     }*/

    /*var scroller = new IScroll("#weather-list", {
     scrollX: scrollX,
     scrollY: scrollY,
     mouseWheel: true,
     fadeScrollbars: false,
     scrollbars: true,
     snap: false
     });*/

    //manageLayout();
}
