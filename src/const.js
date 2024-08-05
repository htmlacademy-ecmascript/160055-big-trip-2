const POINTS_COUNT = 3;
const DEFAULT_SORT_NAME = 'day';

const FilterType = {
  EVERYTHING: 'everything',
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

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight'
};

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const SORTS = Object.values(SortType);

const AUTHORIZATION = 'Basic h5vpbygzbriwj5w';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const POINTS_URL = 'points';
const OFFERS_URL = 'offers';
const DESTINATIONS_URL = 'destinations';

const addEventButton = document.querySelector('.trip-main__event-add-btn');

export {POINTS_COUNT, DEFAULT_SORT_NAME, FilterType, SortType, BLANK_POINT, TYPES, SORTS, UserAction, UpdateType, AUTHORIZATION, END_POINT, POINTS_URL, OFFERS_URL, DESTINATIONS_URL, addEventButton};
