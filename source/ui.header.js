/**
 * Created by Martin on 2015-12-16.
 */
function HeaderUI(container){

    //this.pageRead = new Date();

    this.container = container;

    var platsContainer = document.createElement("h2");
    $(platsContainer).attr("id", "plats");

    var platsNamn = document.createElement("span");
    $(platsNamn).attr("id", "plats-namn");
    $(platsNamn).text("Ingen plats vald...");

    platsContainer.appendChild(platsNamn);

    /*var tidContainer = document.createElement("p");
    $(tidContainer).attr("id", "tid");
    var tidHTML = 'Sidan uppdateras: <span id="tid-sida">alldeles nyss</span> | Prognosen uppdaterades: <span id="tid-prognos">ingen prognos än</span>';
    tidContainer.innerHTML = tidHTML;*/

    this.container.appendChild(platsContainer);
    //this.container.appendChild(tidContainer);

    //this.forecastApprovedDateobject = null;

    var me = this;



    /*this.updateTimers(this);
    var i = setInterval(this.updateTimers, 10*1000, this);

    var ii = setInterval(function(){location.reload()}, 30*60*1000);*/

}

/*HeaderUI.prototype.updateeTimers = function(me){
    var now = new Date();
    var sidUpdDiff = me.pageRead.diff(now);
    $("#tid-sida").text(sidUpdDiff.getShortDurationString() + " sedan ("+me.pageRead.getTimeString()+")");

    if(me.forecastApprovedDateobject){
        var progUpdDiff = me.pageRead.diff(me.forecastApprovedDateobject);
        $("#tid-prognos").text(progUpdDiff.getShortDurationString() + " sedan ("+me.forecastApprovedDateobject.getTimeString()+")");
    } else {
        $("#tid-prognos").text("väntar på data...");
    }

}*/

HeaderUI.prototype.setPlatsnamn = function(namn){
    $("#plats-namn").text(namn);
}

/*HeaderUI.prototype.setForecastTime = function(approvedDateobject){
    this.forecastApprovedDateobject = approvedDateobject;
    this.updateTimers(this);
}*/


HeaderUI.prototype.addKarta = function(kartDOM){
    $("#kart-wrapper").append(kartDOM);
}

