/**
 * Created by Martin on 2015-12-14.
 */

/* API's
 Server-side abvänd INTE! https://developers.google.com/maps/documentation/geocoding/intro#ReverseGeocoding
 Client-side ANVÄND! https://developers.google.com/maps/documentation/javascript/geocoding#ReverseGeocoding

 */

// lägg till Google's client-side map/geo JS API på sidan
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAPkWzKCNHOP_qJJbd15Wk8OmIrUcJvCjE&signed_in=true&callback=" async defer></script>

function GooglePlaceAPI(){
    //console.log(google.maps);
    if(google.maps){
        this.geocoder = new google.maps.Geocoder;
    } else {
        console.log("VARNING!!! Google Maps API INTE LADDAT");
        this.geocoder = false;
    }
}

GooglePlaceAPI.prototype.setOnChangeListener = function(listener, listenerSource){
    this.listener = listener;
    this.listenerSource = listenerSource || null;
};

GooglePlaceAPI.prototype.getPlaceFromCoord = function(lat, long){
    var latlong = {lat: lat, lng: long};
    /*console.log(lat);
    console.log(long);
    console.log(latlong);*/
    var me = this;

    this.geocoder.geocode({'location': latlong}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            //console.log(results);
            if (results[0]) {
                var place = new GooglePlaceData(lat, long, results);
                console.log("Plats "+place);
                //console.log(me.listener);
                //console.log(me.listenerSource);
                if(me.listener) {
                    if (me.listenerSource) {
                        me.listener.call(me.listenerSource, place, me.listenerSource);
                    } else {
                        me.listener(place);
                    }
                }
            } else {
                console.log('Geocoder hittade inget platsnamn');
            }
        } else {
            console.log('Geocoder fel uppstod: ' + status);
        }
    });
};



GooglePlaceAPI.prototype.getPlaceFromMap = function(map){

}