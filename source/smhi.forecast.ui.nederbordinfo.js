/**
 * Created by Martin on 2015-12-13.
 */
function SMHIForecastUINederbordinfo(classesArray){
    // info när eventuell pågående nederbörd slutar
    // info om när eventuell nästa nederbörd börjar

    var classes = classesArray || [];
    classes.push("nederbord-box");

    this.box = new UIWeatherPanel("nederbord-box-panel1", classes);
    this.box.setId = "nederbord-box";
    this.box.setHeader("Nederbörd");
}

SMHIForecastUINederbordinfo.prototype.update = function(data){
    this.box.clear();

    var now = new Date();
    var nowItem = data.getClosestItem();
    var nowNederbord = nowItem.nederbord.value;

    if(nowNederbord > 0){
        var end = null;
        for(var i = 0; i < data.weatherItems.length; i++){
            var item = data.weatherItems[i];
            if(item.nederbord.value != nowNederbord){
                end = item;
                break;
            }
        }
        var endDOM = document.createElement("div");
        $(endDOM).addClass("weather-nederbord-end");
        $(endDOM).addClass("weather-item");
        $(endDOM).addClass("hero");
        var endDOMDesc = document.createElement("p");
        $(endDOMDesc).addClass("desc");
        $(endDOMDesc).addClass("wr-value");
        var endDOMTime = document.createElement("p");
        $(endDOMTime).addClass("time");
        $(endDOMTime).addClass("wr-value");

        endDOM.appendChild(endDOMDesc);
        endDOM.appendChild(endDOMTime);

        if(end){
            var diff = now.diff(end.dateobject);
            $(endDOMDesc).text(nowItem.nederbord.tolkning + " slutar om");
            $(endDOMTime).text(diff.getLongDurationString());

        } else {
            $(endDOMDesc).text("Ser inget slut på "+nowNederbord);
            $(endDOMTime).text(":'(");
        }

        this.box.append(endDOM);

    }

    var next = null;
    for(var i = 0; i < data.weatherItems.length; i++){
        var item = data.weatherItems[i];
        if(item.nederbord.value != nowNederbord && item.nederbord.value > 0){
            next = item;
            break;
        }
    }
    var nextDOM = document.createElement("div");
    $(nextDOM).addClass("weather-nederbord-next");
    $(nextDOM).addClass("weather-item");
    $(nextDOM).addClass("hero");
    var nextDOMDesc = document.createElement("p");
    $(nextDOMDesc).addClass("desc");
    $(nextDOMDesc).addClass("weather-data-value");
    var nextDOMTime = document.createElement("p");
    $(nextDOMTime).addClass("time");
    $(nextDOMTime).addClass("weather-data-value");

    nextDOM.appendChild(nextDOMDesc);
    nextDOM.appendChild(nextDOMTime);

    if(next){
        var diff = now.diff(next.dateobject);
        $(nextDOMDesc).text(next.nederbord.tolkning + " om");
        $(nextDOMTime).text(diff.getLongDurationString());

    } else {
        $(nextDOMDesc).text("Ingen ny nederbörd på ett tag");
        $(nextDOMTime).text(":)");
    }

    this.box.append(nextDOM);
}

SMHIForecastUINederbordinfo.prototype.getDOM = function(){
    return this.box.getDOM();
}
