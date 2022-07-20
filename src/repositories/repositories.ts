import { Knex } from 'knex';

import { ListsRepository } from './lists-repository';
import { ItemsRepository } from './items-repository';

export type Repositories = ReturnType<typeof makeRepositories>;

export function makeRepositories(db: Knex) {
  const listsRepository = new ListsRepository(db);
  const itemsRepository = new ItemsRepository(db);

  return {
    listsRepository,
    itemsRepository
  }
}
