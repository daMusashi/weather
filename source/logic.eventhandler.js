/**
 * Created by Martin on 2017-02-19.
 */

/**
 * Hanterar DOM-händelser
 * @param {string} eventType - namn på DOM-event
 * @param {Handler} listener - Listener som reagerar på händelsen
 * @constructor
 */
function EventHandler(eventType, listener){
    /**
     * Namn på DOM-händelse
     * @type {string}
     */
    this.type = eventType || null;
    /**
     * Listener för händelsen
     * @type {Handler}
     */
    this.listener = listener || null;
}