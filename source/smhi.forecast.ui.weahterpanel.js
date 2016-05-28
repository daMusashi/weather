/**
 * Created by Martin on 2016-01-13.
 */
function UIWeatherPanel(id, classesArray){
    this.id = id;
    this.panels = [];
    var classes = classesArray || [];

    this.box = document.createElement("div");
    $(this.box).addClass("weather-panel");
    $(this.box).attr("id", this.id);
    //$(this.box).addClass("flex-item");  - sätter flex-egenskaper på weahter-panel i CSS istället
    //$(this.box).addClass("flex-panel");  - sätter flex-egenskaper på weahter-panel i CSS istället

    for(var i = 0; i < classes.length; i++){
        $(this.box).addClass(classes[i]);
    }

    var header = document.createElement("header");

    this.title = document.createElement("h4");
    $(this.title).addClass("title");
    header.appendChild(this.title);

    this.subtitle = document.createElement("p");
    $(this.subtitle).addClass("subtitle");
    header.appendChild(this.subtitle);

    this.nav = document.createElement("nav");
    $(this.nav).addClass("panel-nav");

    this.content = document.createElement("article");
    //$(this.content).addClass("flex-panel");

    this.box.appendChild(header);
    this.box.appendChild(this.nav);
    this.box.appendChild(this.content);

}

UIWeatherPanel.prototype.addPanel = function(dom, label, panelType, classesArray){
    this.panels.push(panelType);
    var classes = classesArray || [];

    var panel = document.createElement("div");
    $(panel).addClass("panel");
    $(panel).addClass("panel-"+panelType);
    for(var i = 0; i < classes.length; i++){
        $(panel).addClass(classes[i]);
    }

    panel.appendChild(dom);

    this._addNavItem(label, panelType);

    this.content.appendChild(panel);
}

UIWeatherPanel.prototype._addNavItem = function(label, panelType){
    var navItem = document.createElement("a");
    $(navItem).text(label);
    $(navItem).attr("href", "#");
    $(navItem).attr("data-for-panel", panelType);
    $(navItem).addClass("panel-link");
    $(navItem).addClass("panel-link-"+panelType);
    var me = this;
    $(navItem).on("click", function(){
        me._resetPanels();
        var panelType = $(navItem).attr("data-for-panel");
        me.showPanel(panelType);
    });

    this.nav.appendChild(navItem);
}

UIWeatherPanel.prototype._resetPanels = function(){
    var panelId = "#" + this.id;
    $(panelId + " .panel").removeClass("active");
    $(panelId + " .panel-link").removeClass("active");
}

UIWeatherPanel.prototype.showPanel = function(panelType){
    this._resetPanels();
    var paneId = "#" + this.id;
    $(paneId + " .panel-"+panelType).addClass("active");
    $(paneId + " .panel-link-"+panelType).addClass("active");
}

UIWeatherPanel.prototype.setHeader = function(boxTitleText, boxSubtitleText){
    var titleText = boxTitleText || null;
    var subtitleText = boxSubtitleText || null;

    $(this.title).text(titleText);
    $(this.subtitle).text(subtitleText);

};

UIWeatherPanel.prototype.addClass = function(newClass){
    $(this.box).addClass(newClass);
};

UIWeatherPanel.prototype.removeClass = function(oldClass){
    $(this.box).removeClass(oldClass);
};

UIWeatherPanel.prototype.setId = function(id){
    this.id = id;
    this.box.id = id;
};

UIWeatherPanel.prototype.clear = function(dom){
    this.content.innerHTML = "";
};

UIWeatherPanel.prototype.append = function(dom){
    this.content.appendChild(dom);
};

UIWeatherPanel.prototype.getDOM = function(){
    return this.box;
};