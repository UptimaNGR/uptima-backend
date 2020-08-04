import faker from 'faker';

export const data = {
  name: faker.internet.userName(),
  facilityType: ['station', 'isolated'],
  message: faker.hacker.phrase(),
  companyName: faker.internet.userName(),
  email: faker.internet.email(),
  phoneNumber: `${faker.random.number(100000000000)}`,
  numberOfTanks: faker.random.number(100)
};

export const wrongData = {
  name: faker.internet.userName(),
  facilityType: ['isolate'],
  message: faker.hacker.phrase(),
  companyName: faker.internet.userName(),
  email: faker.internet.email(),
  phoneNumber: faker.random.number(100000000000),
  numberOfTanks: faker.random.number(100)
};
