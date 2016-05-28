function D3Linechart(containerId) {
    this.containerId = containerId;
    this.id = "weather-data-viz-container";

    this.dom = document.createElement("div");
    $(this.dom).attr("id", this.id);

    $("#"+this.containerId).append(this.dom);

    console.log("D3 LINECHART");
    //this.data = null;

    this.locale = d3.locale(
        {
            "decimal": ".",
            "thousands": ".",
            "grouping": [3],
            "currency": ["", "SEK"],
            "dateTime": "%a %b %e %X %Y",
            "date": "%Y-%m-%d",
            "time": "%H:%M:%S",
            "periods": ["AM", "PM"],
            "days": ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"],
            "shortDays": ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"],
            "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        }
    );
    this.timeformat = "%A %d"; // https://github.com/mbostock/d3/wiki/Time-Formatting
    this.width = 900;
    this.height = 400;
    this.margins = {
        top: 20,
        right: 50,
        bottom: 20,
        left: 50
    }
}

D3Linechart.prototype.vizTemp = function(dataobject){
    console.log("D3 LINECHART Viz Temp");
    var chartData = [];

    for(var i = 0; i < dataobject.weatherItems.length; i++){
        var item = dataobject.weatherItems[i];
        var time = item.dateobject;
        chartData.push({x:time, y:item.temp.value});
    }

    this._createChart(chartData);
}

D3Linechart.prototype.vizDayNightNederbord = function(dataobject){
    var chartData = this._getDayNightNederbordChartdata(dataobject);
    this._createChartDayNightNederbord(chartData);
}

D3Linechart.prototype._getDayNightNederbordChartdata = function(dataobject){
    console.log("D3 LINECHART get temp chart data");
    var chartDataDaytemp = [];
    var chartDataNighttemp = [];
    var chartDataNederbord = [];

    for(var i = 0; i < dataobject.weatherDays.length; i++){
        var daytempItem;
        var nighttempItem;
        if(daytempItem = dataobject.weatherDays[i].daytimeItem){
            chartDataDaytemp.push({x: daytempItem.dateobject, y: daytempItem.temp.value});
        }
        if(nighttempItem = dataobject.weatherDays[i].nighttimeItem){
            chartDataNighttemp.push({x: nighttempItem.dateobject, y: nighttempItem.temp.value});
        }
    }

    for(var i = 0; i < dataobject.weatherItems.length; i++){
        var item = dataobject.weatherItems[i];
        var time = item.dateobject;
        chartDataNederbord.push({x:time, y:item.nederbord.value});
    }

    return {day: chartDataDaytemp, night: chartDataNighttemp, nederbord: chartDataNederbord};
}

D3Linechart.prototype._createChartDayNightNederbord = function(chartData){
    console.log("D3 LINECHART Cteate chart");
    console.log("data");
    console.log(chartData);



    // axlar

    var xAxis = this._createXaxisTime(chartData.nederbord);
    var yAxisTemp = this._createYaxisTemp(chartData.day.concat(chartData.night), "left"); // JOIN DAY NIGHT för total max/min
    var yAxisNederbord = this._createYaxisNederbord(chartData.nederbord, "right");



    var viz = d3.select("#"+this.id)
        .append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("id", this.id + "-svg");

    viz.append('svg:g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + (this.height - this.margins.bottom) + ')')
        .call(xAxis);

    viz.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (this.margins.left) + ',0)')
        .call(yAxisTemp );

    viz.append('svg:g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + (this.width - this.margins.right) + ',0)')
        .call(yAxisNederbord);

    // linjer

    var lineFuncTemp = d3.svg.line()
        .x(function(d) {
            var xScaleFunc = xAxis.scale();
            //return xAxis.scale(d.x);
            return xScaleFunc(d.x);
        })
        .y(function(d) {
            var yScaleFunc = yAxisTemp.scale();
            return yScaleFunc(d.y);
        })
        .interpolate('basis'); // https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate

    var lineFuncNederbord = d3.svg.line()
        .x(function(d) {
            var xScaleFunc = xAxis.scale();
            //return xAxis.scale(d.x);
            return xScaleFunc(d.x);
        })
        .y(function(d) {
            var yScaleFunc = yAxisNederbord.scale();
            return yScaleFunc(d.y);
        })
        .interpolate('basis'); // https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate

    // nederbprd
    viz.append('svg:path')
        .attr('d', lineFuncNederbord(chartData.nederbord))
        .attr('stroke', 'blue')
        .attr('stroke-width', 2)
        .attr('fill', 'blue');

    // night
    viz.append('svg:path')
        .attr('d', lineFuncTemp(chartData.night))
        .attr('stroke', 'red')
        .attr('stroke-width', 2)
        .attr('fill', 'none');

    // day
    viz.append('svg:path')
        .attr('d', lineFuncTemp(chartData.day))
        .attr('stroke', 'green')
        .attr('stroke-width', 2)
        .attr('fill', 'none');





}

D3Linechart.prototype._createYaxisTemp = function(chartData, axisSide) {
    // data - skalor. se även http://javascript.tutorialhorizon.com/2015/01/17/d3-fundamentals-understanding-domain-range-and-scales-in-d3js/

    side = axisSide || "left";

    // domain - dataomfång
    var yScale = d3.scale.linear();
    yScale.domain([d3.min(chartData, function (d) {
        return d.y;
    }) - 2, d3.max(chartData, function (d) {
        return d.y;
    }) + 2 ])
    // range - skalans omfång
    yScale.range([this.height - this.margins.top, this.margins.bottom]);

    // axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient(axisSide)
        .tickSize(5)
        .tickSubdivide(true);

    return yAxis;
}

D3Linechart.prototype._createYaxisNederbord = function(chartData, axisSide) {
    // data - skalor. se även http://javascript.tutorialhorizon.com/2015/01/17/d3-fundamentals-understanding-domain-range-and-scales-in-d3js/

    side = axisSide || "left";

    // domain - dataomfång
    var yScale = d3.scale.linear();
    /*yScale.domain([d3.min(chartData, function (d) {
        return d.y;
    }), d3.max(chartData, function (d) {
        return d.y;
    })])*/
    yScale.domain([0.0, 6.0]);
    // range - skalans omfång
    yScale.range([this.height - this.margins.top, this.margins.bottom]);

    // axis
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient(axisSide)
        .tickSize(5)
        .tickSubdivide(true);

    return yAxis;
}

D3Linechart.prototype._createXaxisTime = function(chartData){

    // domain - dataomfång
    var xScale = d3.time.scale();
    xScale.domain([d3.min(chartData, function(d) {
        return d.x;
    }), d3.max(chartData, function(d) {
        return d.x;
    })])

    // range - skalans omfång
    xScale.range([this.margins.left, this.width - this.margins.right]);

    // axis
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickSize(5)
        .tickFormat(this.locale.timeFormat(this.timeformat))
        .tickSubdivide(true);

    return xAxis;
}