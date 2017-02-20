/**
 * Created by Martin on 2016-01-13.
 */
function UiPanel(id, classesArray){
    this.id = id;
    this.panels = [];
    var classes = classesArray || [];

    this.box = document.createElement("div");
    $(this.box).addClass("weather-panel");
    $(this.box).attr("id", this.id);

    for(var i = 0; i < classes.length; i++){
        $(this.box).addClass(classes[i]);
    }

    var header = document.createElement("header");

    this.title = document.createElement("h2");
    $(this.title).addClass("title");
    header.appendChild(this.title);

    this.subtitle = document.createElement("p");
    $(this.subtitle).addClass("subtitle");
    header.appendChild(this.subtitle);

    this.content = document.createElement("article");
    //$(this.content).addClass("flex-panel");

    this.box.appendChild(header);
    this.box.appendChild(this.content);

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

};

UiPanel.prototype.addClass = function(newClass){
    $(this.box).addClass(newClass);
};

UiPanel.prototype.removeClass = function(oldClass){
    $(this.box).removeClass(oldClass);
};

UiPanel.prototype.setId = function(id){
    this.id = id;
    this.box.id = id;
};

UiPanel.prototype.clear = function(dom){
    this.content.innerHTML = "";
};

UiPanel.prototype.append = function(dom){
    $(this.content).append(dom);
};

UiPanel.prototype.getDOM = function(){
    return this.box;
};