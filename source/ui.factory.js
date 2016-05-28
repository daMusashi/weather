function UIFactory (){

}

UIFactory.scrollify = function(scrollContainer, scrollX, scrollY){
    //scrollX = scrollX || false;
    //scrollY = scrollY || true;

    console.log(scrollX);
    console.log(scrollY);
    var scrollclass = "scroll-area";
    if(scrollX){
        scrollclass += "-x";
    }
    if(scrollY){
        scrollclass += "-y";
    }

    //$(scrollContainer.children).wrapAll('<div class="'+scrollclass+'">');

    var scroller = new IScroll(scrollContainer, {
        scrollX: scrollX,
        scrollY: scrollY,
        mouseWheel: true,
        fadeScrollbars: false,
        scrollbars: true,
        snap: false
    });
}