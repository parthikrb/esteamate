const getWorkingDaysCount = (startDate, endDate) => {
  var elapsed, daysBeforeFirstSunday, daysAfterLastSunday;
  var ifThen = function (a, b, c) {
    return a == b ? c : a;
  };

  elapsed = endDate - startDate;
  elapsed /= 86400000;

  daysBeforeFirstSunday = (7 - startDate.getDay()) % 7;
  daysAfterLastSunday = endDate.getDay();

  elapsed -= daysBeforeFirstSunday + daysAfterLastSunday;
  elapsed = (elapsed / 7) * 5;
  elapsed +=
    ifThen(daysBeforeFirstSunday - 1, -1, 0) +
    ifThen(daysAfterLastSunday, 6, 5);

  return Math.ceil(elapsed);
};

export default getWorkingDaysCount;
