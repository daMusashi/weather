/**
 * Created by Martin on 2016-01-09.
 */
function UIDialogFactory() {

}

UIDialogFactory.getErrorModalDOM = function(message){
    var buttons = [this._getCloseButton()];
    var dom = UIDialogFactory._getDialogBaseDOM("error-modal", "error", "Ett fel har uppstått", message, buttons);
    return dom;
};

UIDialogFactory.getMessageModalDOM = function(title, message){
    var dom = UIDialogFactory._getMessageBase("message-modal-place-notfound", title, message);
    return dom;
};

UIDialogFactory.getWaitModalDOM = function(message){
    var dom = UIDialogFactory._getDialogBaseDOM("wait-modal", "wait", message);
    $(dom).attr("data-backdrop", "false");
    return dom;
};

UIDialogFactory._getDialogBaseDOM = function(id, type, dia_html, dia_title, buttonsArray) {
    var buttons = buttonsArray || [];
    var titleText = dia_title || null;
    id = id + "-" + type;
    var dom;

    if(dom = document.getElementById(id)) {

        if (titleText) {
            $(title).text(titleText);
            $(header).css("display", "block");
        } else {
            $(header).css("display", "none");
        }
        $("#" + id + " .modal-body").html(dia_html);

    } else {

        dom = document.createElement('div');
        $(dom).attr("id", id);
        $(dom).addClass("modal");
        $(dom).addClass(type);
        $(dom).addClass("fade");
        $(dom).attr("role", "dialog");

        var dom2 = document.createElement('div');
        $(dom2).attr("class", "modal-dialog");
        dom.appendChild(dom2);

        var closeButton = document.createElement('button');
        $(closeButton).attr("class", "close");
        $(closeButton).attr("type", "button");
        $(closeButton).attr("data-dismiss", "modal");
        $(closeButton).html("&times;");

        var content = document.createElement('div');
        $(content).attr("class", "modal-content");
        dom2.appendChild(content);

        var body = document.createElement('div');
        $(body).attr("class", "modal-body");
        $(body).html(dia_html);

        var header = document.createElement('div');
        $(header).attr("class", "modal-header");
        content.appendChild(header);

        var title = document.createElement('h4');
        $(title).attr("class", "modal-title");

        header.appendChild(closeButton);
        header.appendChild(title);

        // gömmer header om ingen title
        if (titleText) {
            $(title).text(titleText);
        } else {
            $(header).css("display", "none");
        }

        content.appendChild(body);

        if (buttons.length > 0) {
            var footer = document.createElement('div');
            $(footer).attr("class", "modal-footer");
            content.appendChild(footer);

            for (var i = 0; i < buttons.length; i++) {
                footer.appendChild(buttons[i]);
            }
        }

        document.body.appendChild(dom);
    }

    return dom;
};

UIDialogFactory._getMessageBase = function(id, dia_title, dia_html){
    var dom;

    if(dom = document.getElementById(id)) {

        $("#"+id+" .modal-title").text(dia_title);
        $("#"+id+" .modal-body").text(dia_html);

    } else {
        dom = document.createElement('div');
        $(dom).attr("id", id);
        $(dom).attr("class", "modal fade");
        $(dom).attr("role", "dialog");

        var dom2 = document.createElement('div');
        $(dom2).attr("class", "modal-dialog");
        dom.appendChild(dom2);

        var content = document.createElement('div');
        $(content).attr("class", "modal-content");
        dom2.appendChild(content);

        var header = document.createElement('div');
        $(header).attr("class", "modal-header");
        content.appendChild(header);

        var title = document.createElement('h4');
        $(title).attr("class", "modal-title");
        $(title).text(dia_title);
        var button = document.createElement('button');
        $(button).attr("class", "close");
        $(button).attr("type", "button");
        $(button).attr("data-dismiss", "modal");
        $(button).html("&times;");
        header.appendChild(button);
        header.appendChild(title);

        var body = document.createElement('div');
        $(body).attr("class", "modal-body");
        $(body).html(dia_html);
        content.appendChild(body);

        var footer = document.createElement('div');
        $(footer).attr("class", "modal-footer");
        content.appendChild(footer);

        var buttonC = UIDialogFactory._getCloseButton();
        footer.appendChild(buttonC);

        document.body.appendChild(dom);
    }


    return dom;
};

UIDialogFactory._getCloseButton = function(buttonTitle){
    title = buttonTitle = "Stäng";

    var button = document.createElement('button');
    $(button).attr("class", "btn btn-default");
    $(button).attr("type", "button");
    $(button).attr("data-dismiss", "modal");
    $(button).html(title);

    return button;
};
