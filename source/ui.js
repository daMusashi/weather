/**
 * Created by Martin on 2015-12-18.
 */

function WeatherUI(app){
    this._app = app;

    this.Dialogs = UIDialogFactory();
}

WeatherUI.prototype.init = function() {
    var app = this._app;

    $("#footer nav a").on("click", function(){

        if(!$(this).hasClass("active")) {
            $("#footer nav a").removeClass("active")
            if($(this).attr("data-toggles") == "day"){
                console.log("switching to DAY view");
                $(".tab-panel.list").css("opacity", 0);
                $(".tab-panel.day").css("opacity", 1);
                $(this).addClass("active");
            } else {
                console.log("switching to LIST view");
                $(".tab-panel.list").css("opacity", 1);
                $(".tab-panel.day").css("opacity", 0);
                $(this).addClass("active");
            }
        }
    });

    // öppna stäng map
    $("#map-button").click(function (ev) {

        if ($("#frame").hasClass("map-open")) {
            // stäng
            app.ui.closeMap();
        } else {
            // öppna
            app.ui.openMap();
        }
    });

    // öppna stäng radar
    $("#radar-button").click(function (ev) {

        if ($("#frame").hasClass("radar-open")) {
            // stäng
            uiCloseRadar();
        } else {
            // öppna
            uiOpenRadar();
        }
    });

    // scrollers
    // http://iscrolljs.com/
    var daysScroller = new IScroll('#panel-days', {
        scrollY: false,
        scrollX: true,
        scrollbars: true,
        snap: 'div',
        interactiveScrollbars: true

    });

}


WeatherUI.prototype.openMap = function(){
    var mapWidth = $("#map-wrapper").width();
    var sidepanelButtonWidth = $("#map-button").width(); // wrappern har ingen width, består bara av borders
    $("#frame").addClass("map-open");
    $("#frame").addClass("sidepanel-open");
    $("#panel-map").addClass("open");
    $("#panel-map").css("left", 0);
    //$("#panel-main").css("left", mapWidth);
    //$("#panel-main").css("right", -mapWidth);
    $("#panel-header").css("left", mapWidth);
    $("#panel-header").css("right", -mapWidth);
    //$("#panel-header").addClass("map-open");
    //$("#panel-main").css("opacity", 0.3);
    $("#plats").css("padding-left", mapWidth + 2* sidepanelButtonWidth);
    //me.map.redraw();
}

WeatherUI.prototype.closeMap = function(){
    var mapWidth = $("#map-wrapper").width();
    var sidepanelButtonWidth = $("#map-button").width(); // wrappern har ingen width, består bara av borders
    $("#frame").removeClass("map-open");
    $("#frame").removeClass("sidepanel-open");
    $("#panel-map").removeClass("open");
    $("#panel-map").css("left", -mapWidth);
    //$("#panel-main").css("left", 0);
    //$("#panel-main").css("right", 0);
    $("#panel-header").css("left", 0);
    $("#panel-header").css("right", 0);
    //$("#panel-main").removeClass("map-open");
    //$("#panel-header").removeClass("map-open");
    //$("#panel-main").css("opacity", 1);
    $("#plats").css("padding-left", 2* sidepanelButtonWidth);
}

WeatherUI.prototype.openRadar = function(){
    radar.update();
    var radarWidth = $("#radar-wrapper").width();
    $("#frame").addClass("radar-open");
    $("#frame").addClass("sidepanel-open");
    $("#panel-radar").addClass("open");
    $("#panel-radar").css("right", 0);
    /*$("#panel-main").css("left", -radarWidth);
    $("#panel-main").css("right", radarWidth);
    $("#panel-header").css("left", -radarWidth);
    $("#panel-header").css("right", radarWidth);*/
}

WeatherUI.prototype.closeRadar = function(){
    var radarWidth = $("#radar-wrapper").width();
    $("#frame").removeClass("radar-open");
    $("#frame").removeClass("sidepanel-open");
    $("#panel-radar").removeClass("open");
    $("#panel-radar").css("right", -radarWidth);
    /*$("#panel-main").css("left", 0);
    $("#panel-main").css("right", 0);
    $("#panel-header").css("left", 0);
    $("#panel-header").css("right", 0);*/
}

WeatherUI.prototype.manageSizes = function(){
    console.log("Weather: UI manginging sizes");

    // radar - behöver beräknas och ändras i JS, då canvasen behöver skalas med JS, räcker inte med CSS
    var radarDim = this._app.radar.calcDimension();

    //$("#panel-radar").width(radarDim.width + buttonWidth);
    //$("#panel-radar").css("right", radarDim.width);
    //$("#panel-radar").css("right", 0);
    $("#radar-wrapper").width(radarDim.width);
    this._app.radar.setDimension(radarDim);

    // sidepanels
    var sidepanelButtonWidth = $("#map-button").width(); // wrappern har ingen width, består bara av borders
    $("#panel-map").css("left", -$("#map-wrapper").width());
    $("#panel-radar").css("right", -$("#radar-wrapper").width());
    $("#plats").css("padding-left", 2* sidepanelButtonWidth);

}

WeatherUI.prototype.responsify = function() {
    var width = $(document).outerWidth(true);
    var height = $(document).outerHeight(true);

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

    //manageSizes();
}
