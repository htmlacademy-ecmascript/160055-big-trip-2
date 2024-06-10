import {sort} from '../utils/sort.js';

function generateSorting() {
  return Object.entries(sort).map(
    ([sortType]) => ({
      type: sortType,
      isEnable: sortType.isEnabled
    }),
  );
}

export {generateSorting};
