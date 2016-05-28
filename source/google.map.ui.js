/**
 * Created by Martin on 2015-12-14.
 */
// lägg till Google's client-side map/geo JS API på sidan
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAPkWzKCNHOP_qJJbd15Wk8OmIrUcJvCjE&signed_in=true&callback=" async defer></script>

function GoogleMapUI(container, defaultLat, defaultLong) {

    var lat = defaultLat || 60.866556;
    var long = defaultLong || 15.456375;
    var zoom = 6;

    this.container = document.getElementById(container);
    this.mapWrapper = null;

    this.listener = null;
    this.listenerSource = null;


    var shortPress = 300; // används inte kör longPress istället
    var resetTimeout = 10000;

    this.mapAPI = new GoogleMapAPI(lat, long, zoom);

    this.mapWrapper = document.createElement("div");
    $(this.mapWrapper).attr("id", "map-wrapper");

    var buttonWrapper = document.createElement("div");
    $(buttonWrapper).attr("id", "map-button-wrapper");
    $(buttonWrapper).addClass("sidepanel-button");
    this.button = document.createElement("a");
    $(this.button).attr("id", "map-button");
    $(this.button).text(" ");

    buttonWrapper.appendChild(this.button);
    this.container.appendChild(this.mapWrapper);
    this.container.appendChild(buttonWrapper);
}

GoogleMapUI.prototype.init = function(){
    this.mapAPI.init(this.mapWrapper);

    var me = this;

    //this.mapAPI.addEventHandler("click", function(data){console.log("CLICK")}, this);
    this.mapAPI.addEventHandler("long_mousedown", function(mapAPI){
        //console.log('long_mousedown EVENT HANDLER');
        //console.log(mapAPI);
        mapAPI.setCoord(mapAPI.lat, mapAPI.long);

        var data = {lat:mapAPI.lat, long:mapAPI.long};
        //console.log(me);
        if(me.listener) {
            if (me.listenerSource) {
                me.listener.call(me.listenerSource, data);
            } else {
                me.listener(data);
            }
        }
    }, this);

    /* long press
     me.mapAPI.map.panTo(event.latLng);
     me.marker.setPosition(event.latLng);
     lat long i en google event
     */
};

GoogleMapUI.prototype.setOnChangeListener = function(listener, listenerSource){
    this.listener = listener;
    this.listenerSource = listenerSource || null;
};

GoogleMapUI.prototype.setCoord = function(lat, long){
    this.mapAPI.setCoord(lat, long);
};

GoogleMapUI.prototype.redraw = function(){
    this.mapAPI.redraw();
}