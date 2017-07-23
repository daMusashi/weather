/**
 * Created by Martin on 2016-01-13.
 */
function UiPanel(id, classesArray, expandable){
    this._id = id;
    this.panels = [];
    this.expandable = expandable || false;
    var classes = classesArray || [];
    if(this.expandable){
        classes.push("expandable");
    }

    this.box = document.createElement("div");
    $(this.box).addClass("ui-panel");
    //$(this.box).addClass("weather-panel");
    $(this.box).attr("id", this._id);

    for(var i = 0; i < classes.length; i++){
        $(this.box).addClass(classes[i]);
    }

    this.onExpandedHandler = null;
    this.onCollapsedHandler = null;

    var header = document.createElement("header");

    this.title = document.createElement("h2");
    $(this.title).addClass("title");
    header.appendChild(this.title);

    console.log("EXPANDABLE: "+this.expandable);

    this.subtitle = document.createElement("p");
    $(this.subtitle).addClass("subtitle");
    header.appendChild(this.subtitle);

    this.content = document.createElement("article");
    //$(this.content).addClass("flex-panel");

    this.box.appendChild(header);
    this.box.appendChild(this.content);

    this._container = null; // används av expand/collapsse

}

UiPanel.prototype.addPanel = function(dom, label, panelType, classesArray){
    this.panels.push(panelType);
    var classes = classesArray || [];

    var panel = document.createElement("div");
    $(panel).addClass("panel");
    $(panel).addClass("panel-"+panelType);
    for(var i = 0; i < classes.length; i++){
        $(panel).addClass(classes[i]);
    }

    panel.appendChild(dom);

    this.content.appendChild(panel);
};


UiPanel.prototype.setHeader = function(boxTitleText, boxSubtitleText){
    var titleText = boxTitleText || null;
    var subtitleText = boxSubtitleText || null;

    $(this.title).text(titleText);
    if(subtitleText) {
        $(this.subtitle).text(subtitleText);
        $(this.subtitle).removeClass("hide");
    } else {
        $(this.subtitle).addClass("hide");
    }

    if(this.expandable){
        var me = this;
        var buttonExp = $('<button type="button" class="btn btn-sm btn-default btn-expand pull-right">');
        $(buttonExp).html('<span class="glyphicon glyphicon-resize-full">');
        $(buttonExp).on("click", function(){
            me.expand();
        });
        $(this.title).append(buttonExp);

        var buttonColl = $('<button type="button" class="btn btn-sm btn-default btn-collapse pull-right">');
        $(buttonColl).html('<span class="glyphicon glyphicon-remove">');
        $(buttonColl).on("click", function(){
            me.collapse();
        });
        $(this.title).append(buttonColl);
    }

};

UiPanel.prototype.getContentDim = function(){
    var dim = {};

    dim.width = $(this.content).width();
    dim.height = $(this.content).height();

    return dim;
};

UiPanel.prototype.expand = function(){
    this._container = $(this.box).parent();
    $(this.box).addClass("expanded");
    $("body").append(this.box);

    if(this.onExpandedHandler){
        this.onExpandedHandler.handlerCall();
    }
};

UiPanel.prototype.collapse = function(){
    $(this.box).removeClass("expanded");
    $(this._container).append(this.box);

    if(this.onCollapsedHandler){
        this.onCollapsedHandler.handlerCall();
    }
};

UiPanel.prototype.addClass = function(newClass){
    $(this.box).addClass(newClass);
};

UiPanel.prototype.removeClass = function(oldClass){
    $(this.box).removeClass(oldClass);
};

UiPanel.prototype.setId = function(id){
    this._id = id;
    this.box._id = id;
};

UiPanel.prototype.clear = function(dom){
    this.content.innerHTML = "";
};

UiPanel.prototype.append = function(dom){
    $(this.content).append(dom);
};

UiPanel.prototype.appendTo = function(dom){
    $(dom).append(this.box);
};

UiPanel.prototype.getDOM = function(){
    return this.box;
};