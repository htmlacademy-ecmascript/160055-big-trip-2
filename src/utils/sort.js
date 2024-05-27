import {SortingType} from '../const.js';

const sort = {
  [SortingType.DAY]: (points) => points.filter((point) => point),
  [SortingType.EVENT]: (points) => points.filter((point) => point),
  [SortingType.TIME]: (points) => points.filter((point) => point),
  [SortingType.PRICE]: (points) => points.filter((point) => point),
  [SortingType.OFFERS]: (points) => points.filter((point) => point),
};

export {sort};
