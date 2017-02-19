/**
 * Created by Martin on 2017-02-18.
 */

/**
 * Objekt som lagrar värden i "weather item" (ForecastDataItem). Sparar både etikett, (rå-)värde, tolkning och enhet
 * @param {string} label - Etikett för värdet
 * @param {variant} value - värde
 * @param {string} unit - Enehet. Används för utskrift
 * @param {variant} tolkning - Tolkning av värden, såsom "Stark vind" etc.
 * @constructor
 */
function ForecastDataItemParameter(label, value, unit, tolkning){
    this.label = label;
    this.value = value || "-";
    this.unit = unit || "?";
    this.tolkning = tolkning || "";
}

/**
 * Sätter värde och (ev) enhet för parametern. Att användas främst av adaptrar.
 * @param value
 * @param unit
 */
ForecastDataItemParameter.prototype.set = function(value, unit){
    this.value = value;
    if(unit){
        this.unit = unit;
    }
};

/**
 * Returnerar värdet/tolkning som sträng för utskrift
 * @returns {string}
 */
ForecastDataItemParameter.prototype.toString = function(){
    var tolkning;
    if(this.tolkning != ""){
        tolkning = "("+this.tolkning+")";
    } else {
        tolkning = "";
    }
    return this.label+":"+this.value+this.unit+tolkning;
};
