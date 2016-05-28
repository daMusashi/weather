/**
 * Created by Martin on 2016-01-12.
 */
function Windarrow(arrowSize, angleRadianer, arrColor, cirColor){
    // bla baserat på http://deepliquid.com/blog/archives/98

    var size = arrowSize || 100;
    var arrowSize = 0.8 * size; // för att få rotationsutrymme;
    var angle = angleRadianer || 0.5*Math.PI;
    // lägger på först ett kvart varv då 0/360 är norr/upp, medan algoritm nedan räknar 0 som öst (enhetscirklen)
    angle = angle + 0.5*Math.PI;
    // sedan ett halft varv då grderna var vinden kommer IFRÅN, medan pilen ska peka i TILL-riktningen
    angle = angle + Math.PI;
    //var arrowColor = arrColor || "#fff";

    var arrowColor = arrColor;
    var circleColor = cirColor || "#333";

    this.canvas = document.createElement("canvas");
    $(this.canvas).addClass("windarrow");
    this.canvas.width = size;
    this.canvas.height = size;

    var ctx = this.canvas.getContext('2d');

    var arrowPoints = [
        [ 0.5 * arrowSize, 0 ],
        [ -0.5 * arrowSize, -0.3 * arrowSize],
        [ -0.5 * arrowSize, 0.3 * arrowSize]
    ];

    // roterar
    for(var i = 0; i < arrowPoints.length; i++) {
        var pt = arrowPoints[i];
        arrowPoints[i] = this._rotatePoint(-angle, pt[0], pt[1]); // - fix för rätt håll (moturs uppåt 0 till positivt)
    }

    // ritar
    // cirkel
    /*ctx.beginPath();
    ctx.arc(size/2, size/2, size/2, 0, 2 * Math.PI, false);
    //ctx.strokeStyle = circleColor;
    ctx.fillStyle = circleColor;
    //ctx.stroke();
    ctx.fill();*/

    ctx.beginPath();
    ctx.moveTo(arrowPoints[0][0] + size/2, arrowPoints[0][1] + size/2);

    ctx.lineTo(arrowPoints[1][0] + size/2, arrowPoints[1][1] + size/2);
    ctx.lineTo(arrowPoints[2][0] + size/2, arrowPoints[2][1] + size/2);
    ctx.lineTo(arrowPoints[0][0] + size/2, arrowPoints[0][1] + size/2);
    //console.log("ARRAOW COLOR "+arrowColor);
    ctx.fillStyle = arrowColor;
    ctx.fill();


    return this.canvas;
}

Windarrow.prototype._rotatePoint = function(angle, x, y){
    return [
        (x * Math.cos(angle)) - (y * Math.sin(angle)),
        (x * Math.sin(angle)) + (y * Math.cos(angle))
    ];
}