/**
 * Created by Martin on 2015-12-13.
 */
function UiForecastRightnowInfo(classesArray){
    // info när eventuell pågående nederbörd slutar
    // info om när eventuell nästa nederbörd börjar

    var classes = classesArray || [];
    classes.push("nederbordTyp-box");

    this.box = new UIWeatherPanel("nederbordTyp-box-panel1", classes);
    this.box.setId = "nederbordTyp-box";
    this.box.setHeader("Just nu");
}

UiForecastRightnowInfo.prototype.update = function(heroItems){
    this.box.clear();

    var now = $("<div>");
    $(now).addClass("weather-item");
    $(now).addClass("hero-item");
    var nowTemp = $("<p>");
    $(nowTemp).addClass("temp");
    $(nowTemp).addClass("wr-value");
    $(nowTemp).text(heroItems.nowItem.temp.value + heroItems.nowItem.temp.unit);
    $(now).append(nowTemp);

    var nederbord = $("<div>");
    $(nederbord).addClass("weather-item");
    $(nederbord).addClass("hero-item");

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

    this.box.append(now);
    this.box.append(nederbord);

};

UiForecastRightnowInfo.prototype.getDOM = function(){
    return this.box.getDOM();
};
