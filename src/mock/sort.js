import {sort} from '../utils/sort.js';

function generateSorting() {
  return Object.entries(sort).map(
    ([sortType, isEnabled]) => ({
      type: sortType,
      isEnable: isEnabled,
    }),
  );
}

export {generateSorting};
