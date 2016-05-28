/**
 * Created by Martin on 2015-12-01.
 */
function UIManager(platsId, daysId){
    this.platsId = platsId;
    this.platsDOM = null; // skapas av id i create
    this.daysId = daysId;
    this.daysDOM = null; // skapas av id i create

    this.daysNum = 5; // fast antal i API't (openweather.org)
    this.days = [];
}

UIManager.prototype.create = function(){
    this.platsDOM = document.getElementById(this.platsId);
    this.daysDOM = document.getElementById(this.daysId);

    for(var i = 0; i < this.daysNum; i++){
        this.days[i] = new Day(this.daysDOM, (i+1));
    }
};

UIManager.prototype.update = function(weatherDataobject){
    $(this.platsDOM).text(weatherDataobject.city);

    for(var i = 0; i < this.daysNum; i++){
        this.days[i].update(weatherDataobject.days[i]);
    }
    manage_details_height();
};