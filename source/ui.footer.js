/**
 * Created by Martin on 2015-12-20.
 */

function FooterUI(footerContainer){
    this.pageRead = new Date();
    this.forecastApprovedDateobject = null;

    var container = footerContainer;

    var nav = document.createElement("nav");

    var linkDag = document.createElement("a");
    $(linkDag).addClass("active");
    $(linkDag).text("Dag");
    $(linkDag).attr("href", "#");
    $(linkDag).attr("data-toggles", "day");
    $(nav).append(linkDag);

    var linkLista = document.createElement("a");
    $(linkLista).text("Lista");
    $(linkLista).attr("href", "#");
    $(linkLista).attr("data-toggles", "list");
    $(nav).append(linkLista);

    var tid= document.createElement("div");
    $(tid).attr("id", "footer-body");
    var tidHTML = 'Sidan uppdateras: <span id="tid-sida">alldeles nyss</span> | Prognosen uppdaterades: <span id="tid-prognos">ingen prognos än</span>';
    tid.innerHTML = tidHTML;

    $(container).append(nav);
    $(container).append(linkLista);

    /*this.updateTimers(this);
    var i = setInterval(this.updateTimers, 10*1000, this);

    var ii = setInterval(function(){location.reload()}, 10*60*1000);*/

}

FooterUI.prototype.updateTimers = function(me){
    var now = new Date();
    var sidUpdDiff = me.pageRead.diff(now);
    $("#tid-sida").text(sidUpdDiff.getShortDurationString() + " sedan ("+me.pageRead.getTimeString()+")");

    if(me.forecastApprovedDateobject){
        var progUpdDiff = me.pageRead.diff(me.forecastApprovedDateobject);
        $("#tid-prognos").text(progUpdDiff.getShortDurationString() + " sedan ("+me.forecastApprovedDateobject.getTimeString()+")");
    } else {
        $("#tid-prognos").text("väntar på data...");
    }

}

FooterUI.prototype.setForecastTime = function(approvedDateobject){
    this.forecastApprovedDateobject = approvedDateobject;
    this.updateTimers(this);
}