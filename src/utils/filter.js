import {FilterType} from '../const.js';
import {isPointInPast, isPointInPresent, isPointInFuture} from '../utils/point.js';

const filter = {
  [FilterType.EVERTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isPointInFuture(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPointInPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPointInPast(point.dateTo)),
};

function generateFilter() {
  return Object.entries(filter).map(
    ([filterType]) => ({
      type: filterType,
    }),
  );
}

export {filter, generateFilter};
