import {FilterType} from '../const.js';
import {isPointExpiringToday} from './point.js';

const filter = {
  [FilterType.EVERTHING]: (points) => points.filter((point) => point),
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointExpiringToday(point.dueDate)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointExpiringToday(point.dueDate)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointExpiringToday(point.dueDate)),
};

export {filter};
