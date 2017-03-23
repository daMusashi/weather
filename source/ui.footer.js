/**
 * Created by Martin on 2015-12-20.
 */

function UiFooter(){
    this.box = document.createElement("div");
    $(this.box).attr("_id", "footer-container");
    $(this.box).addClass("ui-container");

    var martin = document.createElement("div");
    $(martin).text("Skapad av Martinus Nilssonus");

    $(this.box).append(martin);

}

UiFooter.prototype.getDOM = function(){
    return this.box;
};
