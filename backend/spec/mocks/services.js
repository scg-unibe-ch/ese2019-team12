export default function createMockServices(Service) {
  return Service.bulkCreate([
    {
      id: 1,
      userId: 1,
      title: 'service to get',
      description: 'got it',
      price: 500,
    },
    {
      id: 2,
      userId: 2,
      title: 'second service to get',
      description: 'got it too',
      price: 50
    },
    {
      id: 3,
      userId: 2,
      title: 'service to update',
      description: 'update it',
      price: 5
    },
    {
      id: 4,
      userId: 2,
      title: 'service to delete',
      description: 'delete it',
      price: 1
    },
    {
      id: 5,
      userId: 2,
      title: 'service to delete by admin',
      description: 'delete it',
      price: 1
    },
    {
      id: 6,
      userId: 5,
      title: 'bob\'s service',
      description: 'nobody deletes it',
      price: 1
    },
  ]);  
}      
