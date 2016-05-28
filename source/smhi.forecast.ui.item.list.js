/**
 * Created by Martin on 2016-01-14.
 */
function SMHIForecastUIDataItemList(dataItemList){

    this.items = dataItemList;

    this.dom = document.createElement("div");
    $(this.dom).addClass("weather-item-list");

    for(var i=0; i < this.items.length; i++){
        var data = this.items[i];
        var base = new SMHIForecastUIItemFactory(data);

        var item = document.createElement("div");
        $(item).addClass("weather-item");
        $(item).addClass("list-item");

        var time = base.createTimeValueDOM("p");
        var icon = base.createIconDOM(false, true);
        var temp = base.createTempValueDOM("p");

        item.appendChild(time);
        item.appendChild(icon);
        item.appendChild(temp);

        this.dom.appendChild(item)
    }

    return this.dom;
};

