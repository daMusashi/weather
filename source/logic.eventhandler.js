/**
 * Created by Martin on 2016-01-02.
 */
function EventHandler(eventType, listener, listenerSource){
    this.type = eventType || null;
    this.listener = listener || null;
    this.listenerSource = listenerSource || null;
}