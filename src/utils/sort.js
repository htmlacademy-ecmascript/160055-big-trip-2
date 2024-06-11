import {SortType} from '../const.js';

const sort = {
  [SortType.DAY]: { isEnabled: true },
  [SortType.EVENT]: { isEnabled: false },
  [SortType.TIME]: { isEnabled: true },
  [SortType.PRICE]: { isEnabled: true },
  [SortType.OFFERS]: { isEnabled: false },
};

export {sort};
