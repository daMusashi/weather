/**
 * Created by Martin on 2015-12-14.
 */

/* API's

 Client-side ANVÄND! https://developers.google.com/maps/documentation/javascript/examples/maptype-base

 */

// lägg till Google's client-side map/geo JS API på sidan
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAPkWzKCNHOP_qJJbd15Wk8OmIrUcJvCjE&signed_in=true&callback=" async defer></script>

/* EVENTS
* mousedown
* click
* mouseup
* pan
* bounds_changed
* long_mousedown

 */
function GoogleMapAPI(defaultLat, defaultLong, defaultZoom) {

    this.lat = defaultLat;
    this.long = defaultLong;
    this.zoom = defaultZoom;

    this._longPressTimeoutDuration = CONFIG.GoogleMapLongPressTimeoutDuration;
    //this._longPressTimeout = null;
    //this._longPressClickStart = null;
    this._longPressStarted = false;

    this.map = null;
    this.marker = null;

    this.eventHandlers = [];
};

GoogleMapAPI.prototype.addEventHandler = function(eventType, listener, source){
    this.eventHandlers.push(new EventHandler(eventType, listener, source))
};

GoogleMapAPI.prototype._execEventHandler = function(eventType, sendData){
    var data = sendData || null;
    for(var i = 0; i < this.eventHandlers.length; i++){
        var handler = this.eventHandlers[i];
        if(handler.type == eventType){
            console.log("found event "+eventType);
            if(handler.listener) {
                if (handler.listenerSource) {
                    handler.listener.call(handler.listenerSource, data);
                }
            }
        }
    }
}

GoogleMapAPI.prototype.init = function(container){
    this.map = new google.maps.Map(container, {
        zoom: this.zoom,
        center: {lat: this.lat, lng: this.long},
        streetViewControl: false
    });

    this.marker = new google.maps.Marker({
        position: {lat: this.lat, lng: this.long},
        map: this.map,
        title: 'Långklicka på annan plats för att flytta'
    });

    var me = this;

    this.map.addListener('mousedown', function (event) {
        console.log('mousedown');
        me.lat = event.latLng.lat();
        me.long = event.latLng.lng();
        me._execEventHandler('mousedown', this);
        var longPressTimeout = setTimeout(me._checkLongPressTimeout, me._longPressTimeoutDuration, me);
        //me._longPressClickStart = new Date().getTime();
        me._longPressStarted = true;
    });

    // long press
    this.map.addListener('mouseup', function (event) {
        console.log('click');
        console.log('mouseup');
        me._execEventHandler('mouseup', this);
        me._execEventHandler('click', this);
        me._longPressStarted = false;
    });

    this.map.addListener('center_changed', function () {
        me._execEventHandler('pan', me);
        me._longPressStarted = false;
    });

    this.map.addListener('bounds_changed', function () {
        me._execEventHandler('bounds_changed', me);
    });
};

GoogleMapAPI.prototype._checkLongPressTimeout = function(me){
    if(me._longPressStarted) {
        console.log("long_mousedown TIMEOUT");
        me._execEventHandler('long_mousedown', me);
        me._longPressStarted = false;
    }
}

GoogleMapAPI.prototype.setCoord = function(lat, long){
    //console.log("set coord");
    var pos = {
        lat: lat,
        lng: long
    };
    //this.map.setCenter(pos);
    this.marker.setPosition(pos);
}

GoogleMapAPI.prototype.redraw = function(){
    // fix att använda när kartan behöver åter-initieras
    google.maps.event.trigger(this.map, 'resize');
    this.map.panTo({lat: this.lat, lng: this.long});
}