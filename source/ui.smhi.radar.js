/**
 * Created by Martin on 2015-12-10.
 */

function UiSMHIRadar(container){
    this.mapWidth = CONFIG.SMHIMapWidth;
    this.mapHeight = CONFIG.SMHIMapHeight;
    this.mapAspectratio = this.mapWidth/this.mapHeight;
    this.radarMapsNum = CONFIG.SMHIMapsNum;

    this.radarAPI = new SMHIRadarAPI(this.radarMapsNum, new Handler(this._start, this));

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

    this.zoom = 1;

    this.box = new UiPanel("radar-container", ["ui-container"], true);
    this.box.setHeader("Radar");
    this.box.onExpandedHandler = new Handler(this._onUpscale, this);
    this.box.onCollapseHandler = new Handler(this._onDownscale, this);

    //this.radarWrapper = document.createElement("div");
    //$(this.radarWrapper).attr("_id", "radar-container");

    this.box.appendTo(this.container);

    this.canvas = document.createElement("canvas");
    this.canvas._id = "radar";
    $(this.canvas).addClass("wr-item");

    //this.radarWrapper.appendChild(this.canvas);
    this.box.append(this.canvas);

    this.calcAndSetDimension();


    // basemaps sprites

    function basemapLoaded(me){
        me.spritesBaseLoaded++;
        if(me.spritesBaseLoaded == me.spritesBase.length){
            console.log("radar base maps loaded");
            me._renderBase();
        }
    }

    for(var i =0; i < this.baseMaps.length; i++){
        var sprite = new CanvasSprite(this.canvas.getContext("2d"), this.baseMaps[i], this.mapWidth, this.mapHeight);
        this.spritesBase.push(sprite);
        console.log("loading radar base map");
        sprite.load(basemapLoaded, this);
        var lastSprite = sprite;
    }
}

UiSMHIRadar.prototype.update = function(){
    this.radarAPI.update();
};

UiSMHIRadar.prototype._start = function(radarMaps){
    // radar sprites

    function radarmapLoaded(me){
        me.spritesradarLoaded++;
        if(me.spritesradarLoaded == me.spritesRadar.length){
            console.log("radar maps loaded");
            var int = setInterval(me.nextRadar, me.frameDelay, me);
        }
    }

    for(var i =0; i < radarMaps.length; i++){
        var map = radarMaps[i];
        var sprite = new CanvasSprite(this.canvas.getContext("2d"), map.url, this.mapWidth, this.mapHeight);
        console.log("loading radar maps");
        sprite.load(radarmapLoaded, this);
        this.spritesRadar.push(sprite);
    }

};

UiSMHIRadar.prototype._onUpscale = function(){
    this.calcAndSetDimension();
};

UiSMHIRadar.prototype._downUpscale = function(){
    this.setDimension(5, 5, 1);
    this.calcAndSetDimension();
};

UiSMHIRadar.prototype.calcAndSetDimension = function(){

    var boxDim = this.box.getContentDim();
    console.log("RADAR CALC box size");
    console.log(boxDim);
    var dim = {};

    dim.height = boxDim.height;
    dim.width = parseInt(boxDim.height * this.mapAspectratio);
    dim.scale = (dim.height/this.mapHeight)*this.zoom;
    console.log("radar size");
    console.log(dim);

    this.setDimension(dim.width, dim.height, dim.scale);
};

UiSMHIRadar.prototype.setDimension = function(width, height, scale){

    this.canvas.width = width;
    this.canvas.height = height;
    /*$(this.canvas).height(dim.height);
    $(this.canvas).width(dim.width);*/

    this.canvas.getContext("2d").scale(scale, scale);
    //this.canvas.getContext("2d").scale((this.height/this.SMHIMapHeight)*this.view.zoom, (this.height/this.SMHIMapHeight)*this.view.zoom);
    //this.canvas.getContext("2d").scale(dim.height/this.SMHIMapHeight, dim.height/this.SMHIMapHeight);

    //this.render();
};

UiSMHIRadar.prototype.nextRadar = function(me){
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

UiSMHIRadar.prototype.render = function(){
    this._renderBase();
    //this.spritesRadar[this.frameIndex].render(this.view.x, this.view.y);
    if(this.spritesRadar.length > 0) {
        this.spritesRadar[this.frameIndex].render(0, 0);
    }
};

UiSMHIRadar.prototype._renderBase = function(){

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