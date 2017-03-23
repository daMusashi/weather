// för responsivitet se http://stackoverflow.com/questions/16265123/resize-svg-when-window-is-resized-in-d3-js
function D3Chart(container) {
    this._id = "d3-chart";
    this.container = container;

    this.titel = "Diagram";

    this.axisColor = "#ffffff";

    this.maxDygnNederbord = 25; // http://www.smhi.se/klimatdata/meteorologi/kartor/dailyTable.php?par=nbdDay

    this.dom = document.createElement("div");
    $(this.dom).attr("id", this._id+"-container");

    $(this.container).append(this.dom);

    console.log("D3 LINECHART");
    //this.data = null;

    this.locale = d3.timeFormatLocale(
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

    this.width = 100; // sätts i _getSize();
    this.height = 100; // sätts i _getSize();
    this.padding = {
        top: 10,
        right: 20,
        bottom: 30, // indrag til axel
        left: 30 // indrag till axel
    };
    this.coordHeight = this.height - this.padding.top - this.padding.bottom; // pixelhöjd på koordinatsystemet - sätts i _getSize();
    this.coordWidth = this.width - this.padding.left - this.padding.right; // pixelhöjd på koordinatsystemet - sätts i _getSize();
    this.tempPadding = 2; // extra temp att lägga till på Y-axeln för "luft";
}

D3Chart.prototype.getDOM = function(){
    return this.dom;
};

D3Chart.prototype._getSize = function(){
    this.width = $(this.container).width();
    this.height = $(this.container).height();

    this.coordHeight = this.height - this.padding.top - this.padding.bottom; // pixelhöjd på koordinatsystemet
    this.coordWidth = this.width - this.padding.left - this.padding.right; // pixelhöjd på koordinatsystemet

    //console.log("D3 LINECHART size");
    //console.log(this.width + "x" + this.height);
};


D3Chart.prototype.vizDaysTempNederbord = function(dataset){
    console.log("D3 LINECHART Viz TempNederbord");

    this.titel = "Diagram 1 vecka - temp/nederbörd";

    this._getSize();

    var timeParser = d3.timeParse("%Y-%m-%d"); // https://github.com/d3/d3-time-format/blob/master/README.md#locale_format

    var chartDataDaytemp = [];
    var chartDataDayNederbord = [];

    // dayTemp
    for(var i = 0; i < dataset.dataDays.length; i++){
        var day = dataset.dataDays[i];
        var dayItem = day.dayItem;
        if(dayItem){
            // temp
            chartDataDaytemp.push({time: timeParser(day.date), temp: dayItem.temp.value});
        }
        // nederbord
        chartDataDayNederbord.push({time: timeParser(day.date), nederbord: day.totalNederbord});

    }

    var chartdata =  {daytemp: chartDataDaytemp, nederbord: chartDataDayNederbord};
    console.log(chartdata);

    this._createChartDaysTempNederbord(chartdata);
};

D3Chart.prototype._createChartDaysTempNederbord = function(chartTempNederbordData){
    console.log("D3 LINECHART Cteate chart");
    console.log("data");
    console.log(chartTempNederbordData);

    var chartData = chartTempNederbordData;

    var svg = d3.select("#"+this.dom.id)
        .append("svg")
        .attr("class", "d3-chart")
        .attr("width", this.width)
        .attr("height", this.height)
        .attr("id", this._id + "-chart");

    var chart = svg.append("g");

    console.log(chart);

    var yScaleTemp = this._createYaxisTemp(chart, chartData.daytemp);
    var yScaleNederbord = this._createYaxisNederbord(chart, chartData.nederbord);
    var xScale = this._createXaxisTime(chart, chartData.nederbord);
    this._createTempLine(chart, xScale, yScaleTemp, chartData.daytemp);
    this._createBarsNederbord(chart, xScale, yScaleNederbord, chartData.nederbord);


};

D3Chart.prototype._createTempLine = function(chart, xScale, yScale, chartdataSerie) {
    // https://bl.ocks.org/mbostock/3883245
    console.log(chart);
    console.log(chartdataSerie);
    var line = d3.line()
        .curve(d3.curveCardinal.tension(0.2))
        .x(function(d) { return xScale(d.time); })
        .y(function(d) { return yScale(d.temp); });

    chart.append("path")
        .datum(chartdataSerie)
        .attr("transform", "translate(" + this.padding.left + ", "+this.padding.top+")")
        .attr("class", "values values-line values-line-temp")
        .attr("fill", "none")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 3)
        .attr("d", line);
};

D3Chart.prototype._createBarsNederbord = function(chart, xScale, yScale, chartdataSerie) {
    var barWidth = (this.width-this.padding.left-this.padding.right)/chartdataSerie.length;
    var height = this.coordHeight;
    var paddingLeft = this.padding.left;
    var paddingTop = this.padding.top;
    console.log("height:"+height);

    chart.selectAll(".bar")
        .data(chartdataSerie)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (function(d) { return paddingLeft + xScale(d.time); }))
        .attr("y", (function(d) { return paddingTop + yScale(d.nederbord); }))
        //.attr("y", this.padding.bottom)
        .attr("width", 10)
        //.attr("height", function(d) { return yScale(d.nederbord); });
        //.attr("height", 15);
        .attr("height", (function(d) { return height-yScale(d.nederbord); }));
};

D3Chart.prototype._createYaxisTemp = function(chart, chartdataSerie) {
    // https://bl.ocks.org/mbostock/3883245
    var minTemp = d3.min(chartdataSerie, function(c) {
        return c.temp;
    });
    var maxTemp = d3.max(chartdataSerie, function(c) {
        return c.temp;
    });
    minTemp -= this.tempPadding;
    maxTemp += this.tempPadding;

    console.log("max/min: "+minTemp+"/"+maxTemp);

    var yScale = d3.scaleLinear()
        .domain([minTemp, maxTemp])    // värde-range
        .range([this.coordHeight, 0]); // pixel-range
    /*var yAxisScale = d3.scaleLinear()
        .rangeRound([this.height, 0]);*/

    //yAxisScale.domain(d3.extent(chartdataSerie, function(d) { return d.temp; }));

    // https://github.com/d3/d3-axis
    var yAxis = d3.axisLeft(yScale);
    //yAxis.ticks(5, "s");

    chart.append("g")
        .attr("class", "axis y-axis y-axis-left")
        .attr("transform", "translate(" + this.padding.left + ", "+this.padding.top+")")
        .call(yAxis)
        .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Temp (C)");

    return yScale;
};

D3Chart.prototype._createYaxisNederbord = function(chart, chartDataSerie) {

    var yScale = d3.scaleLinear()
        .domain([0, this.maxDygnNederbord])    // värde-range
        .range([this.coordHeight, 0]); // pixel-range

    var yAxis = d3.axisRight(yScale);
    //yAxis.ticks(5, "s");

    chart.append("g")
        .attr("class", "axis y-axis y-axis-right")
        .attr("transform", "translate(" + (this.padding.left+this.coordWidth) + ", "+this.padding.top+")")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Nederbörd (mm)");

    return yScale;
};

D3Chart.prototype._createXaxisTime = function(chart, chartDataSerie, hour){

    hour = hour || false; // om tid per timme eller dag

    // visa axel med dagar
    var timeformat = "%a %d"; // https://github.com/d3/d3-time-format/blob/master/README.md#locale_format
    if(hour){
        // visa axel med timmar
    }

    // https://bl.ocks.org/mbostock/3883245
    var xAxis = d3.scaleTime()
        .rangeRound([0, this.coordWidth]);

    xAxis.domain(d3.extent(chartDataSerie, function(d) { return d.time; }));

    // https://github.com/d3/d3/blob/master/API.md#axes-d3-axis
    chart.append("g")
        .attr("transform", "translate("+this.padding.left+"," + (this.height-this.padding.bottom) + ")")
        .attr("class", "axis x-axis")
        .call(d3.axisBottom(xAxis)
            .ticks(d3.timeDay)
            .tickFormat(this.locale.format(timeformat)));
        //.select(".domain")
        //.remove();

    return xAxis;
};

