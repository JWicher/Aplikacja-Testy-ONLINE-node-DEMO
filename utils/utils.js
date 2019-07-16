

function getFormatedTime(date){
    const day =  date.slice(0,10);
    const time =  date.slice(11,19);
    return day + " | " + time;
}


module.exports.getFormatedTime = getFormatedTime;


