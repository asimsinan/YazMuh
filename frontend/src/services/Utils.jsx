export function formatDate(date){
    var date = new Date(date);
    var months= [ "Ocak", "Şubat", "Mart", "Nisan", "Mayıs","Haziran","Temmuz", "Ağustos","Eylül","Ekim","Kasım", "Aralık" ];
    var dateInfo = date.getDate();
    var monthInfo = months[date.getMonth()];
    var yearInfo = date.getFullYear();
    var result=dateInfo + ' ' + monthInfo + ' ' + yearInfo;
    return result
  }

export function formatDistance(distance) {
    var newDistance, unit;
    if (distance > 1) {
      newDistance = parseFloat(distance).toFixed(1);
      unit = " km";
    } else {
      newDistance = parseInt(distance * 1000, 10);
      unit = " m";
    }
    return newDistance + unit;
  };