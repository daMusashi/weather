/**
 * Created by Martin on 2015-12-10.
 */

function SMHIRadarUI(container, mapheight){
    this.SMHIMapWidth = CONFIG.SMHIMapWidth;
    this.SMHIMapHeight = CONFIG.SMHIMapHeight;
    this.MapAspectratio = this.SMHIMapWidth/this.SMHIMapHeight;
    this.radarMapsNum = CONFIG.SMHIMapsNum;

    this.radarAPI = new SMHIRadarAPI(this.radarMapsNum, this._start, this);

    this.frameDelay = CONFIG.SMHIMapsFrameDelay;
    this.frameIndex = 0;
    this.framePauseNum = CONFIG.SMHIMapsPauseNum;
    this.framePauseIndex = 0;

    this.container = container;

    this.baseMaps = [];
    /*this.baseMaps.push("http://opendata-download-radar.smhi.se/explore/img/basemap.png");
     this.baseMaps.push("http://opendata-download-radar.smhi.se/explore/img/outlines.png");
     this.baseMaps.push("http://opendata-download-radar.smhi.se/explore/img/cities.png");*/
    this.baseMaps.push("gfx/radar_basemap.jpg");

    this.spritesBase = [];
    this.spritesBaseLoaded = 0;
    this.spritesRadar = [];
    this.spritesradarLoaded = 0;

    // Implenterar inte views till att börja med //
    /*
     this.views = [];
     this.views.push(new SMHIRadarUIView(66.81, 2.8, 150, 0)); // längst upp
     this.views.push(new SMHIRadarUIView(65.08, 2.8, 125, 110)); // storuman
     this.views.push(new SMHIRadarUIView(63.19, 2.8, 100, 200)); // Östersund
     this.views.push(new SMHIRadarUIView(62.04, 2.9, 80, 270)); // sveg
     this.views.push(new SMHIRadarUIView(60.62, 2.8, 80, 370)); // falun
     this.views.push(new SMHIRadarUIView(59.44, 2.6, 60, 420)); // karlstad
     this.views.push(new SMHIRadarUIView(57.78, 2.5, 60, 500)); // jönköping
     this.views.push(new SMHIRadarUIView(56.76, 2.5, 50, 540)); // kalmar

     this.view = this.views[7];
     */

    //this.zoom = 2;

    this.radarWrapper = document.createElement("div");
    $(this.radarWrapper).attr("id", "radar-wrapper");

    this.container.appendChild(this.radarWrapper);

    this.canvas = document.createElement("canvas");
    this.canvas.id = "radar";
    $(this.canvas).addClass("wr-item");
    /*this.canvas.width = this.SMHIMapWidth;
    this.canvas.height = this.SMHIMapHeight;*/

    var dim = {width: CONFIG.SMHIMapWidth, height: CONFIG.SMHIMapHeight};
    this.setDimension(this.calcDimension());

    this.radarWrapper.appendChild(this.canvas);




    // basemaps sprites

    function basemapLoaded(me){
        me.spritesBaseLoaded++;
        if(me.spritesBaseLoaded == me.spritesBase.length){
            //console.log("Alla basemaps har laddats");
            me.renderBase();
        }
    }

    for(var i =0; i < this.baseMaps.length; i++){
        var sprite = new CanvasSprite(this.canvas.getContext("2d"), this.baseMaps[i], this.SMHIMapWidth, this.SMHIMapHeight);
        this.spritesBase.push(sprite);
        sprite.load(basemapLoaded, this);
        var lastSprite = sprite;
    }
}

SMHIRadarUI.prototype.update = function(){
    this.radarAPI.update();
};

SMHIRadarUI.prototype._start = function(radarMaps){
    // radar sprites

    function radarmapLoaded(me){
        me.spritesradarLoaded++;
        if(me.spritesradarLoaded == me.spritesRadar.length){
            //console.log("Alla radars har laddats");
            var int = setInterval(me.nextRadar, me.frameDelay, me);
        }
    }

    for(var i =0; i < radarMaps.length; i++){
        var map = radarMaps[i];
        var sprite = new CanvasSprite(this.canvas.getContext("2d"), map.url, this.SMHIMapWidth, this.SMHIMapHeight);
        sprite.load(radarmapLoaded, this);
        this.spritesRadar.push(sprite);
    }

};

SMHIRadarUI.prototype.calcDimension = function(){

    var dim = {};

    //this.height = mapheight || this.SMHIMapHeight;
    dim.height =  parseInt($(this.container).height());
    //this.scale = (this.height/this.SMHIMapHeight)*this.zoom;
    dim.width = parseInt(dim.height * this.MapAspectratio);

    return dim;
};

SMHIRadarUI.prototype.setDimension = function(dim){

    /*this.canvas.width = dim.width;
    this.canvas.height = dim.height;
    $(this.canvas).height(dim.height);
    $(this.canvas).width(dim.width);*/

    //this.canvas.getContext("2d").scale((this.height/this.SMHIMapHeight)*this.view.zoom, (this.height/this.SMHIMapHeight)*this.view.zoom);
    //this.canvas.getContext("2d").scale(dim.height/this.SMHIMapHeight, dim.height/this.SMHIMapHeight);

    this.render();
};

SMHIRadarUI.prototype.nextRadar = function(me){
    if(me.frameIndex < me.spritesRadar.length){
        me.render();
        me.frameIndex++;
    } else { // pause n�gra frames(intervals p� sista innan nollst�ller radarsIndex
        if(me.framePauseIndex < me.framePauseNum){
            me.framePauseIndex++;
        } else {
            me.frameIndex = 0;
            me.framePauseIndex = 0;
        }
    }
};

SMHIRadarUI.prototype.render = function(){
    this.renderBase();
    //this.spritesRadar[this.frameIndex].render(this.view.x, this.view.y);
    if(this.spritesRadar.length > 0) {
        this.spritesRadar[this.frameIndex].render(0, 0);
    }
};

SMHIRadarUI.prototype.renderBase = function(){

    for(var i =0; i < this.spritesBase.length; i++){
        //this.spritesBase[i].render(this.view.x, this.view.y);
        this.spritesBase[i].render(0, 0);
    }
};

function SMHIRadarUIView(forLat, zoom, startX, startY){
    this.lat = forLat;
    this.zoom = zoom;
    this.x = startX;
    this.y = startY;
}