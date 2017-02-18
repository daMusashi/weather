/**
 * Håller en handler (listener/callback)-funtion med eventuellt källobjekt att köra den på för händelse- och callback-hantering
 * @param {funktion} callback
 * @param {objekt} callbackContext - Objektet handler-funktionen ska köras på (i regel objektet funktionen är definierad i). Om 'this' används, är det objektet this ska syfta på.
 * @constructor
 */
function Handler(handler, handlerContext){
    this.handler = handler;
    this.context = handlerContext || null;

}

/**
 * Metoden som körs vid händelse handlern är till för. Kör i sin tur den lagrade funktion på det lagrade objektet.
 * @param data1 - Valfri parameter som handlern kräver
 * @param data2 - Valfri parameter som handlern kräver
 * @param data3 - Valfri parameter som handlern kräver
 */
Handler.prototype.handlerCall = function(data1, data2, data3){
    if(this.context){
        this.handler.call(this.context, data1, data2, data3);
    } else {
        this.handler(data1, data2, data3);
    }
};
