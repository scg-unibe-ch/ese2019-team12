export default function createMockEvents(Event) {
  return Event.bulkCreate([
    {
      id: 1,
      userId: 2,
      name: 'event0',
      description: 'an event',
      date: '2017-09-11'
    },
    {
      id: 2,
      userId: 2,
      name: 'projectX',
      description: 'a boring event',
      date: '2019-02-12'
    },
    {
      id: 3,
      userId: 2,
      name: 'do not delete',
      description: 'don\'t delete',
      date: '2019-09-09'
    },
    {
      id: 4,
      userId: 2,
      name: 'do not delete 2',
      description: 'don\'t delete',
      date: '2019-09-09'
    },
    {
      id: 5,
      userId: 2,
      name: 'do delete',
      description: 'to delete',
      date: '2011-01-01'
    },
    {
      id: 6,
      userId: 2,
      name: 'updatable',
      description: 'do update',
      date: '2011-01-01'
    }
  ]);
}
