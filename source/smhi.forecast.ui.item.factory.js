/**
 * Created by Martin on 2015-12-12.
 */
function SMHIForecastUIItemFactory(dataItem){
    this.data = dataItem;

    this.dayDOM;
    this.dateDOM; // datum
    this.timeDOM;
    this.iconDOM;
    this.molnDescDOM;
    this.nederbordDescDOM;
    this.vindIconDOM;
    this.vindDescDOM;
}



SMHIForecastUIItemFactory.prototype.getTdDOM = function(customClass){
    customClass = customClass || null;

    var wrapper = document.createElement("tr");
    $(wrapper).addClass("weather-item");
    $(wrapper).addClass("weather-item-list");
    $(wrapper).addClass("list");
    if(customClass){
        $(wrapper).addClass(customClass);
    }

    //var icon = new WeatherIcon(100, this.data);

    var time = this.createCommonValueDOM("td", this.data.time, "wr-time");
    var temp = this.createCommonValueDOM("td", this.data.temp.value + "°", "wr-temp");
    var vader = this.createCommonValueDOM("td", this.data.molnighet.tolkning, "wr-vader-desc");
    if(this.data.nederbord.value > 0){
        vader.innerHTML += " - " +this.data.nederbord.tolkning;
    }

    //icon.append(wrapper);
    wrapper.appendChild(time);
    wrapper.appendChild(temp);
    wrapper.appendChild(vader);

    return wrapper;
};


SMHIForecastUIItemFactory.prototype.createTempValueDOM = function(tag){
    var classes = ["temperature", "weather-data"];
    if(this.data.temp.value < CONFIG.coldLimit){
        classes.push("cold");
    }
    if(this.data.temp.value > CONFIG.warmLimit){
        classes.push("hot");
    }
    return this.createCommonValueDOM(tag, this.data.temp.value + "°", classes);
};
SMHIForecastUIItemFactory.prototype.createCloudcoverValueDOM = function(tag){
    return this.createCommonValueDOM(tag, this.data.molnighet.tolkning, ["cloudcover", "weather-data"]);
};
SMHIForecastUIItemFactory.prototype.createTimeValueDOM = function(tag){
    return this.createCommonValueDOM(tag, this.data.time, ["time", "weather-data"]);
};

SMHIForecastUIItemFactory.prototype.createPrecipitationValueDOM = function(tag){
    var desc = "";
    var classes = ["precipitation", "weather-data"];
    if(this.data.nederbord.value > 0){
        desc = this._getNederbordMangdDesc(this.data.nederbordMangdMax.value, this.data.nederbord.tolkning);
        //desc = desc + " ("+this.data.nederbordMangdMax.value+" "+this.data.nederbordMangdMax.unit+")";
    } else {
        classes.push("suppress");
        desc = "Uppehåll";
    }
    var dom = this.createCommonValueDOM(tag, desc, classes);
    return dom;
};
SMHIForecastUIItemFactory.prototype.createWindValueDOM = function(tag){
    var mainDOM = document.createElement(tag);
    $(mainDOM).addClass("weather-data");
    $(mainDOM).addClass("wind");

    var opacity = this.data.vindHastighet.value/14;
    if(opacity < 0.05){
        opacity = 0.05;
    }
    if(opacity > 1){
        opacity = 1;
    }
    var arrowDOM = document.createElement("span");
    $(arrowDOM).addClass("wind-direction");
    var arrowColor = "rgba("+CONFIG.colorWindArrow[0]+", "+CONFIG.colorWindArrow[1]+", "+CONFIG.colorWindArrow[2]+", "+opacity.toFixed(2)+")";
    arrowDOM.appendChild(new Windarrow(15, this.data.vindRiktning.value*(Math.PI/180), arrowColor));
    // skapar opactitet efter styrka, 14 m/s max (1) - börjar "hård vind", sedan varningfärger istället, 0.05 lägsta opacity

    //$(arrowDOM).css("opacity", opacity);

    //var riktningDOM = this.createCommonValueDOM("span", this.data.vindRiktning.tolkning, ["winddirection-cardinal"]);
    var hastighetDOM = this.createCommonValueDOM("span", this.data.vindHastighet.tolkning, ["wind-speed"]);
    if(this.data.vindHastighet.value < CONFIG.supressWindUnder){
        $(hastighetDOM).addClass("suppress");
    }

    var byhastighetDOM = this.createCommonValueDOM("span", this.data.vindByarHastighet.tolkning + " i byar!", ["wind-gustspeed"]);
    $(byhastighetDOM).addClass("warning");
    byhastighetDOM.innerHTML = "<br>" + byhastighetDOM.innerHTML;

    mainDOM.appendChild(arrowDOM);
    //mainDOM.appendChild(riktningDOM);
    mainDOM.appendChild(hastighetDOM);
    if(this.data.vindHastighet.tolkning != this.data.vindByarHastighet.tolkning) {
        if(this.data.vindByarHastighet.value > CONFIG.warnForByarAt) { // 14 stark vind
            mainDOM.appendChild(byhastighetDOM);
        }
    }

    return mainDOM;
};

SMHIForecastUIItemFactory.prototype.createIconDOM = function(big, simple){
    var icon = new WeatherIcon(this.data, big, simple);
    var iconWrapper = document.createElement("div");
    $(iconWrapper).addClass("icon");
    $(iconWrapper).addClass("weather-data");
    iconWrapper.appendChild(icon);

    return iconWrapper;
};

SMHIForecastUIItemFactory.prototype.createCommonValueDOM = function(tag, value, customClasses){
    var classes = customClasses || [];
    var dom = document.createElement(tag);
    for(var i = 0; i < classes.length; i++) {
        $(dom).addClass(classes[i]);
    }
    $(dom).addClass("weather-data-value");
    $(dom).text(value);

    return dom;
};

/*
 Baseras på vanlig klassifiering, se http://www.smhi.se/kunskapsbanken/meteorologi/nederbordsintensitet-1.19163
 */
SMHIForecastUIItemFactory.prototype._getNederbordMangdDesc = function(mangd, typ){
    var adjektiv = "Lätt";
    if(typ.toLowerCase() == "snö") {
        // egen tolkning efter snabbstudier av data, termer från http://www.smhi.se/kunskapsbanken/meteorologi/nederbordsintensitet-1.19163
        if (mangd > 0.2) {
            adjektiv = "Måttligt";
        }
        if (mangd > 0.6) {
            adjektiv = "Tätt";
        }
    } else {
        // från http://www.smhi.se/kunskapsbanken/meteorologi/nederbordsintensitet-1.19163
        if (mangd > 0.5) {
            adjektiv = "Måttligt";
        }
        if (mangd > 4) {
            adjektiv = "Starkt";
        }
    }
    return adjektiv + " " + typ.toLowerCase();
}
