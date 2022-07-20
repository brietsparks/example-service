import { Knex } from 'knex';
import { v4 as uuid } from 'uuid';

import { listsTable } from '../database';

export interface List {
  id: string;
  creationTimestamp: Date;
  name: string;
}

export interface CreateListParams {
  name: string;
}

export class ListsRepository {
  constructor(
    private db: Knex
  ) {}

  createList = async (params: CreateListParams) => {
    const id = uuid();
    await this.db
      .into(listsTable.name)
      .insert({
        [listsTable.columns.id]: id,
        [listsTable.columns.name]: params.name,
      });
    return { id };
  }

  getList = async (id: string): Promise<List | undefined> => {
    return this.db
      .from(listsTable.name)
      .select(listsTable.columns)
      .where({ [listsTable.columns.id]: id })
      .first();
  }

  getAllLists = async (): Promise<List[]> => {
    return this.db
      .from(listsTable.name)
      .select(listsTable.columns);
  }
}
