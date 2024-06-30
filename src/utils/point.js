import dayjs from 'dayjs';
// eslint-disable-next-line no-undef
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);

// eslint-disable-next-line no-undef
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);

// eslint-disable-next-line no-undef
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);
// eslint-disable-next-line no-undef
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);

function isPointInPast(endDate) {
  return endDate && dayjs().isAfter(endDate, 'D');
}

function isPointInPresent(startDate, endDate) {
  return dayjs().isSameOrAfter(startDate, 'D') && dayjs().isSameOrBefore(endDate, 'D');
}

function isPointInFuture(startDate) {
  return startDate && dayjs().isBefore(startDate, 'D');
}

const DATE_FORMAT = 'MMM DD';
const HOUR_FORMAT = 'HH:mm';
const MINUTES_FORMAT = 'mm[M]';
const HOURS_FORMAT = 'HH[H] mm[M]';
const DAYS_FORMAT = 'DD[D] HH[H] mm[M]';
const YEARS_FORMAT = 'YY[y] DD[D] HH[H] mm[M]';

const FIELD_DATE_FORMAT = 'DD/MM/YY HH:mm';

function lower(type) {
  return type.toLowerCase();
}

function humanizePointDate(dateFrom) {
  return dateFrom ? dayjs.utc(dateFrom).format(DATE_FORMAT) : '';
}
function humanizeFormPointDate(dateFrom) {
  return dateFrom ? dayjs.utc(dateFrom).format(FIELD_DATE_FORMAT) : '';
}

function humanizePointHour(hour) {
  return hour ? dayjs.utc(hour).format(HOUR_FORMAT) : '';
}

function getDifferenceDate(dateFrom, dateTo) {
  const difference = dayjs(dateTo).diff(dayjs(dateFrom), 'hour');
  if (difference < 1) {
    return dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format(MINUTES_FORMAT);
  } else if (difference < 24) {
    return dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format(HOURS_FORMAT);
  } else if (difference >= 24) {
    return dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format(DAYS_FORMAT);
  } else if (difference > 24 * 365) {
    return dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format(YEARS_FORMAT);
  }
}

function sortByDay(pointA, pointB) {
  return dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
}

function sortByTime(pointA, pointB) {
  const timeAPoint = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const timeBPoint = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));

  return timeBPoint - timeAPoint;
}

function sortByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

const getPointTypeOffer = (offersMocks,pointMocks) => offersMocks.find((offer)=> offer.type === pointMocks.type);

const getDestinationById = (destMocks, pointMocks) => destMocks.find((item)=> item.id === pointMocks.destination);

const getDestinationByTargetName = (destMocks, targetName) => destMocks.find((item)=> item.name === targetName);

export {isPointInPast, isPointInPresent, isPointInFuture, lower, humanizePointDate, humanizeFormPointDate, humanizePointHour, getDifferenceDate, sortByDay, sortByTime, sortByPrice, getPointTypeOffer, getDestinationById, getDestinationByTargetName};
