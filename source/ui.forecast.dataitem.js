/**
 * Created by Martin on 2015-12-12.
 */

/**
 * Alla ui-metoder för data items ("Weather item")
 * @param {ForecastDataItem} dataItem
 * @constructor
 */
function UiDataItem(dataItem){
    this._data = dataItem;

    this.dayDOM;
    this.dateDOM; // datum
    this.timeDOM;
    this.iconDOM;
    this.molnDescDOM;
    this.nederbordDescDOM;
    this.vindIconDOM;
    this.vindDescDOM;
}

UiDataItem.prototype.getBigDOM = function(customClass){

    var wrapper = document.createElement("div");
    $(wrapper).addClass("weather-item");
    $(wrapper).addClass("weather-item-big");
    $(wrapper).addClass("big");
    if(customClass){
        $(wrapper).addClass(customClass);
    }

    var icon = this._createIconDOM();
    var temp = this._createTempValueDOM("p");
    var moln = this._createCloudcoverValueDOM("p");
    var nederbord = this._createPrecipitationValueDOM("p");
    var vind = this._createWindValueDOM("p");

    wrapper.appendChild(icon);
    wrapper.appendChild(temp);

    wrapper.appendChild(moln);
    wrapper.appendChild(nederbord);
    wrapper.appendChild(vind);

    return wrapper;
};

UiDataItem.prototype.getSmallDOM = function(customClass){

    var wrapper = document.createElement("div");
    $(wrapper).addClass("weather-item");
    $(wrapper).addClass("weather-item-small");
    $(wrapper).addClass("small");
    if(customClass){
        $(wrapper).addClass(customClass);
    }

    var icon = this._createIconDOM();
    var temp = this._createTempValueDOM("p");
    var nederbord = this._createPrecipitationValueDOM("p");

    wrapper.appendChild(icon);
    wrapper.appendChild(temp);
    wrapper.appendChild(nederbord);

    return wrapper;
};

UiDataItem.prototype.getListItemDOM = function(customClass){
    var wrapper = document.createElement("div");
    $(wrapper).addClass("weather-item");
    $(wrapper).addClass("list-item");
    if(customClass){
        $(wrapper).addClass(customClass);
    }

    var time = base._createTimeValueDOM("p");
    var icon = base._createIconDOM(false, true);
    var temp = base._createTempValueDOM("p");

    wrapper.appendChild(time);
    wrapper.appendChild(icon);
    wrapper.appendChild(temp);

    return wrapper;
};


//* LOCALS *//
UiDataItem.prototype._createTempValueDOM = function(tag){
    var classes = ["temperature", "weather-data"];
    if(this._data.temp.value < CONFIG.coldLimit){
        classes.push("cold");
    }
    if(this._data.temp.value > CONFIG.warmLimit){
        classes.push("hot");
    }
    return this._createCommonValueDOM(tag, this._data.temp.value + "°", classes);
};
UiDataItem.prototype._createCloudcoverValueDOM = function(tag){
    return this._createCommonValueDOM(tag, this._data.molnighet.tolkning, ["cloudcover", "weather-data"]);
};
UiDataItem.prototype._createTimeValueDOM = function(tag){
    return this._createCommonValueDOM(tag, this._data.time, ["time", "weather-data"]);
};

UiDataItem.prototype._createPrecipitationValueDOM = function(tag){
    var desc = "";
    var classes = ["precipitation", "weather-data"];
    desc = this._data.nederbordMangd.tolkning;
    if(this._data.nederbordTyp.value == 0){
        classes.push("suppress");
    }

    return this._createCommonValueDOM(tag, desc, classes);
};
UiDataItem.prototype._createWindValueDOM = function(tag){
    var mainDOM = document.createElement(tag);
    $(mainDOM).addClass("weather-data");
    $(mainDOM).addClass("wind");

    var opacity = this._data.vindHastighet.value/14;
    if(opacity < 0.05){
        opacity = 0.05;
    }
    if(opacity > 1){
        opacity = 1;
    }
    var arrowDOM = document.createElement("span");
    $(arrowDOM).addClass("wind-direction");
    var arrowColor = "rgba("+CONFIG.colorWindArrow[0]+", "+CONFIG.colorWindArrow[1]+", "+CONFIG.colorWindArrow[2]+", "+opacity.toFixed(2)+")";
    arrowDOM.appendChild(new Windarrow(15, this._data.vindRiktning.value*(Math.PI/180), arrowColor));
    // skapar opactitet efter styrka, 14 m/s max (1) - börjar "hård vind", sedan varningfärger istället, 0.05 lägsta opacity

    //$(arrowDOM).css("opacity", opacity);

    //var riktningDOM = this._createCommonValueDOM("span", this.data.vindRiktning.tolkning, ["winddirection-cardinal"]);
    var hastighetDOM = this._createCommonValueDOM("span", this._data.vindHastighet.tolkning, ["wind-speed"]);
    if(this._data.vindHastighet.value < CONFIG.supressWindUnder){
        $(hastighetDOM).addClass("suppress");
    }

    var byhastighetDOM = this._createCommonValueDOM("span", this._data.vindByarHastighet.tolkning + " i byar!", ["wind-gustspeed"]);
    $(byhastighetDOM).addClass("warning");
    byhastighetDOM.innerHTML = "<br>" + byhastighetDOM.innerHTML;

    mainDOM.appendChild(arrowDOM);
    //mainDOM.appendChild(riktningDOM);
    mainDOM.appendChild(hastighetDOM);
    if(this._data.vindHastighet.tolkning != this._data.vindByarHastighet.tolkning) {
        if(this._data.vindByarHastighet.value > CONFIG.warnForByarAt) { // 14 stark vind
            mainDOM.appendChild(byhastighetDOM);
        }
    }

    return mainDOM;
};

UiDataItem.prototype._createIconDOM = function(big, simple){
    var icon = new WeatherIcon(this._data, big, simple);
    var iconWrapper = document.createElement("div");
    $(iconWrapper).addClass("icon");
    $(iconWrapper).addClass("weather-data");
    iconWrapper.appendChild(icon);

    return iconWrapper;
};

UiDataItem.prototype._createCommonValueDOM = function(tag, value, customClasses){
    var classes = customClasses || [];
    var dom = document.createElement(tag);
    for(var i = 0; i < classes.length; i++) {
        $(dom).addClass(classes[i]);
    }
    $(dom).addClass("weather-data-value");
    $(dom).text(value);

    return dom;
};


