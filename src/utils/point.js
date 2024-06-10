import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';

const HOUR_FORMAT = 'HH:mm';

const FIELD_DATE_FORMAT = 'DD/MM/YY HH:mm';

function humanizePointDate(dateFrom) {
  return dateFrom ? dayjs(dateFrom).format(DATE_FORMAT) : '';
}
function humanizeFormPointDate(dateFrom) {
  return dateFrom ? dayjs(dateFrom).format(FIELD_DATE_FORMAT) : '';
}

function humanizePointHour(hour) {
  return hour ? dayjs(hour).format(HOUR_FORMAT) : '';
}

function getDifferenceDate(dateFrom, dateTo) {
  return dayjs(dateTo).diff(dayjs(dateFrom), 'h');
}

function isPointExpiringToday(dueDate) {
  return dueDate && dayjs(dueDate).isSame(dayjs(), 'D');
}

function sortByDay(pointA, pointB) {
  return pointA.dateFrom - pointB.dateFrom;
}

function sortByTime(pointA, pointB) {
  const timeAPoint = getDifferenceDate(pointA.dateFrom, pointA.dateTo);
  const timeBPoint = getDifferenceDate(pointB.dateFrom, pointB.dateTo);

  return timeAPoint - timeBPoint;
}

function sortByPrice(pointA, pointB) {
  return pointA.basePrice - pointB.basePrice;
}

export {humanizePointDate, humanizeFormPointDate, humanizePointHour, getDifferenceDate, isPointExpiringToday, sortByDay, sortByTime, sortByPrice};
