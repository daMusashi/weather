/**
 * Created by Martin on 2015-12-13.
 */
function CanvasSprite(context, imgUrl, width, height){
    this.context = context;
    this.url = imgUrl;
    this.width = width;
    this.height = height;
    this.img = null;
    this.loaded = false;
}

CanvasSprite.prototype.load = function(callback, callbackSource){
    this.img = new Image();
    this.img.src = this.url;
    this.img.width = this.width;
    this.img.height = this.height;
    this._onLoad = callback;
    this._onLoadSource = callbackSource;
    //console.log(callback);
    //console.log(callbackSource);

    var me = this;

    this.img.onload = function(){
        //console.log(me.img.src + " loaded");
        me.loaded = true;
        me._onLoad(me._onLoadSource);
    }
};

CanvasSprite.prototype.render = function(startX, startY){
    var sX = startX || 0;
    var sY = startY || 0;
    if(this.loaded){
        this.context.drawImage(this.img, sX, sY, this.img.width, this.img.height, 0, 0, this.img.width, this.img.height);
    } else {
        console.log("VARNING! Försöker använda "+ this.url +" innan den laddats");
    }
};