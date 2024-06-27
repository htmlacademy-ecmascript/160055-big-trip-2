const mockPoints = [
  {
    dateFrom: '2024-12-25T18:30:45.123Z',
    dateTo: '2024-12-25T18:45:30.987Z',
    destination: 'geneva',
    basePrice: 20,
    offers: [
      'taxi1',
      'taxi3',
      'taxi4'
    ],
    type: 'taxi',
    isFavorite: true,
  },
  {
    dateFrom: '2024-07-10T22:55:56.845Z',
    dateTo: '2024-07-11T01:30:45.123Z',
    destination: 'amsterdam',
    basePrice: 600,
    offers: [
      'bus2',
      'bus4',
      'bus5'
    ],
    type: 'bus',
    isFavorite: false,
  },
  {
    dateFrom: '2024-09-12T18:20:30.500Z',
    dateTo: '2024-09-13T09:45:15.999Z',
    destination: 'chamonix',
    basePrice: 180,
    offers: [
      'flight1'
    ],
    type: 'flight',
    isFavorite: false,
  },
  {
    dateFrom: '2024-10-14T14:30:00.123Z',
    dateTo: '2024-10-15T08:00:45.678Z',
    destination: 'geneva',
    basePrice: 135,
    offers: [],
    type: 'ship',
    isFavorite: true,
  },
  {
    dateFrom: '2024-03-14T10:30:00.123Z',
    dateTo: '2024-03-15T08:24:45.678Z',
    destination: 'geneva',
    basePrice: 430,
    offers: [
      'flight1'
    ],
    type: 'flight',
    isFavorite: true,
  },
  {
    dateFrom: '2024-03-14T10:30:00.123Z',
    dateTo: '2024-03-15T08:24:45.678Z',
    destination: 'none',
    basePrice: 3120,
    offers: [
      'sightseeing1'
    ],
    type: 'sightseeing',
    isFavorite: true,
  }
];

export {mockPoints};
