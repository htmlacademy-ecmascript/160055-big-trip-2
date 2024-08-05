import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(utc);

const ONE_HOUR = 1;
const HOURS_IN_DAY = 24;
const DAYS_IN_MONTH = 31;
const DATE_FORMAT = 'MMM DD';
const HOUR_FORMAT = 'HH:mm';
const MINUTES_FORMAT = 'mm[M]';
const HOURS_FORMAT = 'HH[H] mm[M]';
const DAYS_FORMAT = 'DD[D] HH[H] mm[M]';
const FIELD_DATE_FORMAT = 'DD/MM/YY HH:mm';

function isPointInPast(endDate) {
  return endDate && dayjs().isAfter(endDate, 'D');
}

function isPointInPresent(startDate, endDate) {
  return dayjs().isSameOrAfter(startDate, 'D') && dayjs().isSameOrBefore(endDate, 'D');
}

function isPointInFuture(startDate) {
  return startDate && dayjs().isBefore(startDate, 'D');
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

const changeDateFormat = (date, dateFormat)=> dayjs(date).format(dateFormat);

const getLongDate = (dateTo, dateFrom)=> {
  const diffInDays = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).asDays();
  const diffInHours = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).asHours();

  const summaryDays = Math.round(diffInDays);

  const daysRemain = diffInDays - summaryDays;
  const hoursInTrip = Math.round(daysRemain * 24);

  const hoursRemain = diffInHours - Math.round(diffInHours);
  const minutesInTrip = Math.round(hoursRemain * 60);

  if((hoursInTrip.toString()).length === 1 || (minutesInTrip.toString()).length === 1){
    return `${summaryDays}D 0${hoursInTrip}H 0${minutesInTrip}M`;
  }else {
    return`${summaryDays}D ${hoursInTrip}H ${minutesInTrip}M`;
  }
};

function getDifferenceDate(dateFrom, dateTo) {
  const differenceInHours = dayjs(dateTo).diff(dayjs(dateFrom), 'hour');
  const differenceInDays = dayjs(dateTo).diff(dayjs(dateFrom), 'day');
  if (differenceInHours <= ONE_HOUR) {
    return dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format(MINUTES_FORMAT);
  } else if (differenceInHours < HOURS_IN_DAY) {
    return dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format(HOURS_FORMAT);
  } else if (differenceInHours >= HOURS_IN_DAY) {
    if (differenceInDays > DAYS_IN_MONTH) {
      return getLongDate(dateTo, dateFrom);
    } else {
      return dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom))).format(DAYS_FORMAT);
    }

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

export {changeDateFormat, isPointInPast, isPointInPresent, isPointInFuture, humanizePointDate, humanizeFormPointDate, humanizePointHour, getDifferenceDate, sortByDay, sortByTime, sortByPrice, getPointTypeOffer, getDestinationById, getDestinationByTargetName};
