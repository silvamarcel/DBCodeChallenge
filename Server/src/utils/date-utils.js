'use strict';

var moment = require('moment');

function getValidDates() {
    var actual = moment();
    var begin = moment();
    var end = moment();
    if (actual.isBefore(getTime(11,30,0,0))) {
        begin = getTime(14,0,0,0).subtract(1, 'days');
        end = getTime(11,29,59,999);
    } else {
        begin = getTime(14,0,0,0);
        end = getTime(11,29,59,999).add(1, 'days');
    }
    return {
        begin: begin,
        end: end
    };
};

function getTime(hour, minute, second, millisecond) {
    var time = moment();
    time.set('hour', hour);
    time.set('minute', minute);
    time.set('second', second);
    time.set('millisecond', millisecond);
    return time;
}

module.exports = {
    getValidDates: getValidDates,
    getTime: getTime
};
