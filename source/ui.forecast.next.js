/**
 * Created by Martin on 2015-12-13.
 */

/**
 * Manager för kommande-data i next-panelen
 * @param {Array} classesArray - En array med extra-klasser
 * @constructor
 */
function UiForecastNextInfo(classesArray){

    var classes = classesArray || [];
    classes.push("next-box");

    this.box = new UiPanel("next", classes);
    this.box.setHeader("Kommande");

    this._commonClass = "next-item";
}

UiForecastNextInfo.prototype.update = function(heroItems){
    this.box.clear();



    var nederbord = $("<div>");
    $(nederbord).addClass(this._commonClass);
    $(nederbord).addClass("nederbord");
    var nederbordTitel = $("<h3>Nederbörd</h3>");
    $(nederbord).append(nederbordTitel);

    var nederbordStart = $("<p>");
    $(nederbordStart).addClass("nederbord");
    $(nederbordStart).addClass("wr-value");

    var nederbordEnd = $("<p>");
    $(nederbordEnd).addClass("nederbord");
    $(nederbordEnd).addClass("wr-value");


    if(heroItems.startNederbordItem) {
        var timeDiffStart = new DateDiff(new Date(), heroItems.startNederbordItem.dateobject);
        $(nederbordStart).text(heroItems.startNederbordItem.nederbordTyp.tolkning + " startar " + timeDiffStart.getLongDurationString());
        if(!heroItems.endNederbordItem) {
            // startar och slutar inte
            $(nederbordEnd).text("Slutar inte på 10 dagar :'(");
        }
    }
    if(heroItems.endNederbordItem) {
        var timeDiffEnd = new DateDiff(new Date(), heroItems.endNederbordItem.dateobject);
        $(nederbordEnd).text(heroItems.endNederbordItem.nederbordTyp.tolkning + " slutar " + timeDiffEnd.getLongDurationString());
        if(!heroItems.startNederbordItem) {
            // pågår
            $(nederbordStart).text(heroItems.nowItem.nederbordTyp.tolkning + " pågår");
        }
    }

    if(!heroItems.startNederbordItem && !heroItems.endNederbordItem){
        $(nederbordStart).text("Ingen nederbörd under perioden :)");
    }

    $(nederbord).append(nederbordStart);
    $(nederbord).append(nederbordEnd);
    this.box.append(nederbord);


    var first = this._getNextItemDOM(heroItems.firstItem, "Första");
    var now = this._getNextItemDOM(heroItems.nowItem, "Nu");
    var next = this._getNextItemDOM(heroItems.nextItem, "Snart +"+CONFIG.nextDuration+"h");
    var later = this._getNextItemDOM(heroItems.laterItem, "Senare +"+CONFIG.laterDuration+"h");

    var nextWeatherBox = document.createElement("div");
    $(nextWeatherBox).addClass("next-weather-box");
    //$(nextWeatherBox).append(first);
    $(nextWeatherBox).append(now);
    $(nextWeatherBox).append(next);
    $(nextWeatherBox).append(later);
    this.box.append(nextWeatherBox);

};

UiForecastNextInfo.prototype._getNextItemDOM = function(item, titel){
    var now = new Date();
    var ui = new UiDataItem(item);
    var itemDOM = ui.getSmallDOM();
    var box = $("<div>");
    $(box).addClass(this._commonClass);
    $(box).addClass("next-weather");
    var titel = $("<h3>"+titel+"</h3>");
    $(box).append(titel);
    var tid = $("<p>");
    $(tid).addClass("time");
    $(tid).addClass("wr-value");
    if(now.getDayName() == item.day) {
        $(tid).text(item.time);
    } else {
        $(tid).text(item.day + " " + item.time);
    }

    $(box).append(titel);
    $(box).append(itemDOM);
    $(box).append(tid);

    return box;
};

UiForecastNextInfo.prototype.getDOM = function(){
    return this.box.getDOM();
};
