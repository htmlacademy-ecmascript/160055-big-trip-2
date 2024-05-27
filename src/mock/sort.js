import {sort} from '../utils/sort.js';

function generateSorting() {
  return Object.entries(sort).map(
    ([sortingType]) => ({
      type: sortingType,
    }),
  );
}

export {generateSorting};
