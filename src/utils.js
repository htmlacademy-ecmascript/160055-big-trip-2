import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';

const HOUR_FORMAT = 'HH:mm';

const FIELD_DATE_FORMAT = 'DD/MM/YY HH:mm';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
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
  // const hoursDifference = new Date(dateTo.getTime() - dateFrom.getTime());
  // return dayjs(hoursDifference).format(DIF_FORMAT);
  return dayjs(dateTo).diff(dayjs(dateFrom), 'h');
}

// function isPointFavorite(favoriting) {
//   return Object.values(favoriting).some(Boolean);
// }

export {getRandomArrayElement, getRandomNumber, humanizePointDate, humanizeFormPointDate, humanizePointHour, getDifferenceDate};
