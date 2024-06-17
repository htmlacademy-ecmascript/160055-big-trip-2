import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
const HOUR_FORMAT = 'HH:mm';
const MINUTES_FORMAT = 'mm[M]';
const HOURS_FORMAT = 'HH[H] mm[M]';
const DAYS_FORMAT = 'DD[D] HH[H] mm[M]';

const FIELD_DATE_FORMAT = 'DD/MM/YY HH:mm';
const milli = 60000;

function capitalize(type) {
  return type[0].toUpperCase() + type.slice(1);
}

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
  const difference = dayjs(dateTo).diff(dayjs(dateFrom));
  if (difference / milli < 60) {
    return dayjs(difference).format(MINUTES_FORMAT);
  } else if (difference / milli > 60 && difference / milli < 60 * 24) {
    return dayjs(difference).format(HOURS_FORMAT);
  } else {
    return dayjs(difference).format(DAYS_FORMAT);
  }
}

function sortByDay(pointA, pointB) {
  return pointA.dateFrom - pointB.dateFrom;
}

function sortByTime(pointA, pointB) {
  const timeAPoint = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeBPoint = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return timeAPoint - timeBPoint;
}

function sortByPrice(pointA, pointB) {
  return pointA.basePrice - pointB.basePrice;
}

export {capitalize, humanizePointDate, humanizeFormPointDate, humanizePointHour, getDifferenceDate, sortByDay, sortByTime, sortByPrice};
