/**
 * Created by Martin on 2015-12-14.
 */

/**
 * Behandlar och håller geodata för en plats från Google
 * @param {string} lat - Latitud för platsen
 * @param {string} long - Longtide för platsen
 * @param {objekt} googleResult - Returdatan (JSON) från Google Maps API
 * @constructor
 */
function GooglePlaceData(lat, long, googleResult){

    this._data = googleResult;
    /**
     * Latitude
     */
    this.lat = lat;
    /**
     * Longitude
     */
    this.long = long;
    /**
     * Land
     */
    this.land = null; // country
    this.lan = null; // värmlnds län = administrative_area_level_1*/
    this.stad = null; // gullhomen/gullspång = postal_town
    this.del = null; // rud/söder = sublocality_level_1
    this.lokal = null; // harm/linhult = locality
    this.vag = null;

    this._process();

}

/**
 *
 * @private
 */
GooglePlaceData.prototype._process = function(){
    // adress_components[0].types[0]
    //console.log("PLATS DATA");
    //console.log(this.data);

    // tar bara första compoenten då den verkar innehålla allt jag behöver
    var placeComponents = this._data[0].address_components;
    //console.log(placeComponents);

    this.vag = this._getAdressComponent(placeComponents, "route");
    if(this.vag) {
        if (this.vag.toLowerCase() == "unnamed road") {
            this.vag = null;
        }
    }
    this.lokal = this._getAdressComponent(placeComponents, "locality");
    this.del = this._getAdressComponent(placeComponents, "sublocality_level_1");
    this.stad = this._getAdressComponent(placeComponents, "postal_town");
    this.lan = this._getAdressComponent(placeComponents, "administrative_area_level_1");
    this.land = this._getAdressComponent(placeComponents, "country");

};

GooglePlaceData.prototype._getAdressComponent = function(components, typeToGet){
    result = null;
    for(var i = 0; i < components.length; i++){
        var component = components[i];
        for(var j = 0; j < component.types.length; j++) {
            if (component.types[j] == typeToGet) {
                result = component.short_name;
            }
        }
    }
    return result;
}

GooglePlaceData.prototype.getString = function(){
    var str = "";
    /*if(this.vag){
        str += this.vag;
    }
    if(!this.vag){
        if(this.lokal) {
            if (this.lokal != this.stad) {
                str += this.lokal;
            }
        }
    }
    if(!this.vag && !this.lokal) {
        if (this.del) {
            if (this.lokal) {
                str += ", " + this.del;
            } else {
                str += this.del;
            }
        }
    }
    if(this.stad){
        if(this.lokal || this.del){
            str += ", "+this.stad;
        } else {
            str += this.stad;
        }
    }
    if(this.lan){
        str += ", "+this.lan;
    }*/
    str = this.stad + " ("+this.del+")";
    return str;
}

GooglePlaceData.prototype.toString = function(){
    return "<PLACE "+this.lokal+","+this.del+","+this.stad+","+this.lan+","+this.land+">";
}