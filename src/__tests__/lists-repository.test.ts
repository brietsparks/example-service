import { faker } from '@faker-js/faker';

import { getTestApp, TestApp } from '../test-setup';

describe('UsersRepository', () => {
  let app: TestApp;

  beforeAll(async () => {
    app = await getTestApp();
  });

  afterAll(async () => {
    await app.stop();
  });

  test('createList and getList', async () => {
    const params = {
      name: faker.random.alpha()
    };

    const creation = await app.repositories.listsRepository.createList(params);

    const retrieval = await app.repositories.listsRepository.getList(creation.id);

    expect(retrieval).toEqual({
      id: creation.id,
      creationTimestamp: expect.any(Date),
      name: params.name
    });
  });
});
