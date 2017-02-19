/**
 * Created by Martin on 2015-12-13.
 */
function UiForecastRightnowInfo(classesArray){
    // info när eventuell pågående nederbörd slutar
    // info om när eventuell nästa nederbörd börjar

    var classes = classesArray || [];
    classes.push("nederbordTyp-box");

    this.box = new UiPanel("nederbordTyp-box-panel1", classes);
    this.box.setId = "nederbordTyp-box";
    this.box.setHeader("Kommande");
}

UiForecastRightnowInfo.prototype.update = function(heroItems){
    this.box.clear();

    var nederbord = $("<div>");
    $(nederbord).addClass("weather-item");
    $(nederbord).addClass("hero-item");
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


    var first = this._getNextItemDOM(heroItems.firstItem, "Första");
    var now = this._getNextItemDOM(heroItems.nowItem, "Nu");
    var next = this._getNextItemDOM(heroItems.nextItem, "Snart +"+CONFIG.nextDuration+"h");
    var later = this._getNextItemDOM(heroItems.laterItem, "Senare +"+CONFIG.laterDuration+"h");

    this.box.append(nederbord);
    //this.box.append(first);
    this.box.append(now);
    this.box.append(next);
    this.box.append(later);

};

UiForecastRightnowInfo.prototype._getNextItemDOM = function(item, titel){
    var now = new Date();
    var ui = new UiDataItem(item);
    var itemDOM = ui.getSmallDOM();
    var box = $("<div>");
    $(box).addClass("next-item");
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

UiForecastRightnowInfo.prototype.getDOM = function(){
    return this.box.getDOM();
};
