/**
 * Created by Martin on 2015-12-16.
 */
function UiHeader(){

    //this.pageRead = new Date();

    this._platsnamnId = "plats-namn";
    this._providesId = "provider-info";
    this._bytplatsIdId = "button-byt-plats";

    this.box = document.createElement("div");
    $(this.box).attr("id", "header-container");
    $(this.box).addClass("ui-container");

    var leftContainer = $("<div>");
    $(leftContainer).addClass("pull-left");

    var placeButton = $("<button>");
    $(placeButton).attr("_id", this._bytplatsIdId);
    $(placeButton).text("Byt plats");
    $(placeButton).addClass("btn");
    $(placeButton).addClass("btn-xs");
    $(placeButton).addClass("btn-primary");

    var plats = document.createElement("h2");
    $(plats).attr("id", this._platsnamnId);
    $(plats).text("Ingen plats vald...");

    $(leftContainer).append(plats);
    $(leftContainer).append(placeButton);

    $(this.box).append(leftContainer);

    var rightContainer = $("<div>");
    $(rightContainer).addClass("pull-right");

    var provider = document.createElement("span");
    $(provider).attr("id", this._providesId);
    $(provider).text("Ingen data laddad...");

    $(rightContainer).append(provider);

    $(this.box).append(rightContainer);

    this.interval = null;

    var me = this;


    var i = setInterval(this.updateTimers, 10*1000, this);

    //var ii = setInterval(function(){location.reload()}, 30*60*1000);

}

UiHeader.prototype.updateTimers = function(me){
    var now = new Date();

}

/**
 * Uppdaterar infon i headern
 * @param {ForecastDataset} dataset - Dataset att uppdaera med
 */
UiHeader.prototype.update = function(dataset){
    $("#"+this._platsnamnId).text(dataset.plats.getString());
    $("#"+this._providesId).text("Källa: "+dataset.provider);
};


UiHeader.prototype.getDOM = function(){
    return this.box;
};



