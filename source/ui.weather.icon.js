/**
 * Created by Martin on 2015-12-12.
 */
function WeatherIcon(dataItem, big, simple){
    this.storSize = 80;
    this.litenSize = 40;

    this.data = dataItem;
    this.isSimple = simple || false; // simple = bara en ikon: sol, moln, regn eller snö
    this.isBig = big || true;

    this.size = this.litenSize;
    if(this.isBig){
        this.size = this.storSize;
    }

    this.height = this.size;
    this.width = this.height;
    //this.scale = this.height/this.originSize;
    //this.width = this.height * this.scale;

    this.canvas = document.createElement("canvas");
    this.canvas.id = "weaher-icon-"+this.height+"-"+this.data.id;
    this.canvas.width = this.size;
    this.canvas.height = this.size;

    //$(this.canvas).height(this.height);
    //$(this.canvas).width(this.width);
    //$(this.canvas).width("100%");

    //this.canvas.getContext("2d").scale(this.scale, this.scale);

    this.skySprite = null;
    this.nederbordSprite = null;
    this.simpleSprite = null;

    if(this.isSimple) {
        this._addSimple(this.isBig);
    } else {
        this._addSky(this.isBig);
    }

    return this.canvas;

}

WeatherIcon.prototype._addSky = function(isStor){

    function skyLoaded(me){
        me.skySprite.render();
        me._addNederbord();
    }

    var file = "gfx/";
    if(isStor){
        file += "stor_";
    } else {
        file += "liten_";
    }
    var dageEllerNatt = "_dag";
    var isDag = true;
    if(!isDag){
        var dageEllerNatt = "_natt";
    }
    switch(this.data.molnighet.value) {
        case 1:
        case 2:
            //"Mestadels klart";
            file += "mestadels_klart";
            break;
        case 3:
        case 4:
        case 5:
            // "Halvklart";
            file += "halvklart";
            break;
        case 6:
        case 7:
            // "Nästan mulet";
            file += "halvklart";
            break;
        case 8:
            // "Mulet";
            file += "mulet";
            break;
        default:
            // klart
            file += "klart";
    }
    if(this.data.molnighet != 8){
        file += dageEllerNatt;
    }
    file += ".png";

    this.skySprite = new CanvasSprite(this.canvas.getContext("2d"), file, this.size, this.size);
    this.skySprite.load(skyLoaded, this);
};

WeatherIcon.prototype._addNederbord = function(isStor){

    isStor = isStor || true;

    function nederbordLoaded(me){
        if(me.nederbordSprite) {
            me.nederbordSprite.render();
        }
    }

    if(this.data.nederbord.value > 0) {
        var file = "gfx/";
        if (isStor) {
            file += "stor_inkludera_";
        } else {
            file += "liten_inkludera_";
        }
        switch (this.data.nederbord.value) {
            case 1:
                // "Snö";
                file += "sno";
                break;
            case 2:
                // "Snöblandat regn";
                file += "snoblandat";
                break;
            case 3:
                //"Regn";
                file += "regn";
                break;
            case 4:
                // "Duggregn" / drizzle
                file += "duggregn";
                break;
            case 5:
                // "Underkylt regn";
                file += "regn";
                break;
            case 6:
                // "Underkylt duggregn";
                file += "duggregn";
                break;
            default:
                tolkning = "";
                cat = 0;
        }

        file += ".png";

        this.nederbordSprite = new CanvasSprite(this.canvas.getContext("2d"), file, this.size, this.size);
        this.nederbordSprite.load(nederbordLoaded, this);
    } else {
        nederbordLoaded(this);
    }
}

WeatherIcon.prototype._addSimple = function(isStor){
    isStor = isStor || true;

    function simpleLoaded(me){
        if(me.simpleSprite) {
            me.simpleSprite.render();
        }
    }

    var type = "klart_dag";

    switch(this.data.molnighet.value) {
        case 2:
        case 3:
        case 4:
        case 5:
            //"halvklart";
            type = "halvklart_dag";
            break;
        case 6:
        case 7:
        case 8:
            // "Mulet";
            type = "mulet_dag";
            break;
    }

    // om nederbörd, ersätter sol/moln
    if(this.data.nederbord.value > 0) {

        switch (this.data.nederbord.value) {
            case 1:
            case 2:
                // "Snö";
                type = "inkludera_sno";
                break;
            case 3:
            case 4:
            case 5:
            case 6:
                //"Regn";
                type = "inkludera_regn";
                break;
        }
    }

    var file = "gfx/";
    if (isStor) {
        file += "stor_";
    } else {
        file += "liten_";
    }
    file += type + ".png";

    //console.log("simple file "+file);

    this.simpleSprite = new CanvasSprite(this.canvas.getContext("2d"), file, this.size, this.size);
    this.simpleSprite.load(simpleLoaded, this);

}