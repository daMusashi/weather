/**
 * Created by Martin on 2015-12-09.
 */

/**
 * Märk layout-containers med .layout
 * - .full-screen sätter absolute och allt 0
 * I .layout-containrar
 * - .row ligga under varanadra
 * - .col ligga bredvid varandra
 * JOBBA VIDARE
 */
function manage_UI_sizes(){
    manage_equal_height_days();
    manage_details_height();
}

function manage_equal_height_days(){
    console.log("manging days height");
    var wantedHeight = $("#day-2").outerHeight();
    $("#day-1").outerHeight(wantedHeight);
}

function manage_details_height(){
    console.log("manging detials height");
    var daysHeightRatio = 0

    var totalHeight = $("#page").outerHeight();
    //console.log("page outer height "+totalHeight);

    var headerHeight = $("#header").outerHeight();
    //console.log("header outer height "+headerHeight);

    var daysHeight = $("#days").outerHeight();
    //console.log("days outer height "+daysHeight);

    var footerHeight = $("#footer").outerHeight();
    //console.log("footer outer height "+footerHeight);

    var articleHeight = totalHeight - (headerHeight + footerHeight + daysHeight);
    //console.log("article outer height "+articleHeight);

    $("#details").outerHeight(articleHeight);
}