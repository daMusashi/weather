/**
 * Håller en samlings handlers. Används när en flera handlers behövs för en händelse/callback
 * @constructor
 */
function HandlerStack(){
    this.stack = [];
    /**
     * Antalet handlers i stacken
     * @type {number}
     */
    this.length = 0;
}

/**
 * Lägger till en callback som ett Handler-objekt
 * @param {Handler} handlerObject
 */
HandlerStack.prototype.add = function(handlerObject){
    this.stack.push(handlerObject);
    this.length++;
};

/**
 * Lägger till en callback som en funktion och käll-objekt
 * @param {function} handler
 * @param {object} context
 */
HandlerStack.prototype.addHandler = function(handler, context){
    if(!context){
        context = null;
    }
    this.stack.push(new Handler(handler, context));
    this.length++;
};

/**
 * Kör alla callbacks i stacken
 * @param data1 - Valfri parameter som handlern kräver
 * @param data2 - Valfri parameter som handlern kräver
 * @param data3 - Valfri parameter som handlern kräver
 */
HandlerStack.prototype.handlerCall = function(data1, data2, data3){
    for(var i = 0; i < this.stack.length; i++){
        this.stack[i].handlerCall(data1, data2, data3);
    }
}
