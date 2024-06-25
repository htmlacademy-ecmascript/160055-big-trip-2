const POINTS_COUNT = 3;
const DEFAULT_SORT_NAME = 'day';

const FilterType = {
  EVERTHING: 'everthing',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const SORTS = Object.values(SortType);
const CITIES = ['Amsterdam', 'Geneva', 'Chamonix'];

export {POINTS_COUNT, DEFAULT_SORT_NAME, FilterType, SortType, TYPES, SORTS, CITIES};
