/**
 * Created by Martin on 2015-12-14.
 */
Date.prototype.getDayName = function(){
    switch(this.getDay()){
        case 1:
            return "Måndag";
            break;
        case 2:
            return "Tisdag";
            break;
        case 3:
            return "Onsdag";
            break;
        case 4:
            return "Torsdag";
            break;
        case 5:
            return "Fredag";
            break;
        case 6:
            return "Lördag";
            break;
        case 0:
            return "Söndag";
            break;
        default:
            return "okänd dag";
    }

};

Date.prototype.isWeekend = function(){
    if(this.getDay() == 6 || this.getDay() == 0){
        return true;
    } else {
        return false;
    }

};

Date.prototype.getDateString = function (){
    return this.toLocaleDateString();
};

Date.prototype.getTimeString = function (){
    return "kl."+this._addZero(this.getHours())+":"+this._addZero(this.getMinutes());
};

Date.prototype.diff = function (dateObj){
    return new DateDiff(this, dateObj);
};

Date.prototype._addZero = function (val){
    if(val < 10){
        return "0"+val;
    } else {
        return val;
    }
};

function DateDiff(dateObj1, dateObj2){
    this.msDag = 24 * 60 * 60 *1000;
    this.msTimme = 60 * 60 *1000;
    this.msMinut = 60 *1000;

    this.totalMillisecondsDiff = dateObj2 - dateObj1;
    this.totalMilliseconds = Math.abs(this.totalMillisecondsDiff);
    var ms = this.totalMilliseconds;


    // dagar
    this.dagar = Math.floor(ms / this.msDag);
    if(this.dagar > 0){
        ms -= this.dagar * this.msDag;
    }

    // timmar
    this.timmar = Math.floor(ms / this.msTimme);
    if(this.timmar > 0){
        ms -= this.timmar * this.msTimme;
    }

    // minuter
    this.minuter = Math.floor(ms / this.msMinut);
    if(this.minuter > 0){
        ms -= this.minuter * this.msMinut;
    }
}

DateDiff.prototype.getDays = function(){
    return this.dagar;
};

DateDiff.prototype.getHours = function(){
    return this.timmar;
};

DateDiff.prototype.getMinutes = function(){
    return this.minuter;
};

DateDiff.prototype.getTotalHours = function(){
    return Math.round(this.totalMilliseconds / this.msTimme);
};

DateDiff.prototype.getTotalMinutes = function(){
    return Math.round(this.totalMilliseconds / this.msMinut);
};

DateDiff.prototype.getTotalMinutesDiff = function(){
    return Math.round(this.totalMillisecondsDiff / this.msMinut);
};

DateDiff.prototype.getLongDurationString = function(){
    var str;

    if(this.dagar > 0){
        if(this.timmar < 1){
            str = this.dagar + " dagar ";
        } else {
            str = this.dagar + " dagar " + this.timmar + "h";
        }
    } else {
        if(this.timmar < 1){
            str = " inom timmen";
        } else {
            str = this.timmar + " timmar";
        }
    }
    return str;
};

DateDiff.prototype.getShortDurationString = function(){
    var str;
    if(this.timmar > 0){
        str = this.timmar + " timmar " + this.minuter + " minuter";
    } else {
        str = this.minuter + " minuter";
    }
    return str;
};