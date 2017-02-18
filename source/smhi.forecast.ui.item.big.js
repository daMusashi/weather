/**
 * Created by Martin on 2016-01-14.
 */
function SMHIForecastUIDataItemBig(dataItem){

    this._data = dataItem;

    var base = new SMHIForecastUIItemFactory(this._data);

    //console.log("Skapar BIG item-UI för "+this.data.date + "|"+this.data.time);

    var wrapper = document.createElement("div");
    $(wrapper).addClass("weather-item");
    $(wrapper).addClass("weather-item-big");
    $(wrapper).addClass("big");

    var icon = base.createIconDOM();
    var temp = base.createTempValueDOM("p");
    var moln = base.createCloudcoverValueDOM("p");
    var nederbord = base.createPrecipitationValueDOM("p");
    var vind = base.createWindValueDOM("p");

    wrapper.appendChild(icon);
    wrapper.appendChild(temp);

    wrapper.appendChild(moln);
    wrapper.appendChild(nederbord);
    wrapper.appendChild(vind);

    return wrapper;
};