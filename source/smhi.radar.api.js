/**
 * Created by Martin on 2015-12-10.
 */

function SMHIRadarAPI(numLatestRadars, onUpdatedListiner, onUpdatedListinerSource){
    this.radars = [];
    this.numLatestRadars = numLatestRadars;
    this.listener = onUpdatedListiner || null;
    this.listenerSource = onUpdatedListinerSource || null;
}

SMHIRadarAPI.prototype.update = function(){
    var d = new Date();
    var dString = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();

    var me = this; // skapar tillg�ng till "this" via "me" i event-anropade ("globalt" anropade) metoder

    $.get( "http://opendata-download-radar.smhi.se/api/version/latest/area/sweden/product/comp/"+dString,
        {
            format: "png"
        })
        .done(function( data ) {
            //console.log("radar-data har laddats");
            //console.log(data);

            var radarImgNum = me.numLatestRadars; // var 5:e minut = 60 mmin -> 12 bilder
            if(data.files.length < me.numLatestRadars){
                radarImgNum = data.files.length;
            }

            for(var i = 0; i < radarImgNum; i++){
                var imgObj = data.files[data.files.length-1-i].formats[0];
                var radar = new SMHIRadarMap(imgObj.updated, imgObj.link);
                me.radars.push(radar);
            }
            me.radars.reverse(); // l�gger r�tt igen kronologiskt
            //console.log(radars);

            if(me.listener) {
                if (me.listenerSource) {
                    me.listener.call(me.listenerSource, me.radars);
                } else {
                    me.listener(me.radars);
                }
            }
        })
        .fail(function() {
            // TODO kan vara att data f�r dagen inte existerar �n, prova med f�rg�ende dag
            // inte bara att g�ra med dag - 1, kan bli loop

            console.log( "VARNING! Kunde inte h�mta radar-data fr�n SMHI" );
        });
};

function SMHIRadarMap(time, imgUrl){
    this.time = time;
    this.url = imgUrl;
};
