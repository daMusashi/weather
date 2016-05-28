/**
 * Created by Martin on 2016-01-31.
 */
function CONFIG() {};

CONFIG.maxDays = 10;

// temp
CONFIG.coldLimit = 0;
CONFIG.warmLimit = 20;

// vind
CONFIG.colorWindArrow = [169, 222, 245];
CONFIG.warnForByarAt = 14; // starkvind - om vanlig vind mindre, varnar för byar större än
CONFIG.supressWindUnder = 8; // > 8 = frisk vind

// map
CONFIG.GoogleMapLongPressTimeoutDuration = 500;

// radar
CONFIG.SMHIMapWidth = 471;
CONFIG.SMHIMapHeight = 887;
CONFIG.SMHIMapsNum = 20; // maps i animering
CONFIG.SMHIMapsFrameDelay = 150; // millisekunder mellan varje frame
CONFIG.SMHIMapsPauseNum = 5; // antal frames sista framen ligger kvar som paus
