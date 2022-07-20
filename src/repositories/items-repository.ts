import { Knex } from 'knex';
import { v4 as uuid } from 'uuid';

import { itemsTable } from '../database';

export interface CreateItemParams {
  listId: string;
  name: string;
}

export class ItemsRepository {
  constructor(
    private db: Knex
  ) {}

  createItem = async (params: CreateItemParams) => {
    const id = uuid();
    await this.db
      .into(itemsTable.name)
      .insert({
        [itemsTable.columns.id]: id,
        [itemsTable.columns.listId]: params.listId,
        [itemsTable.columns.name]: params.name,
      });
    return { id };
  }

  getItem = async (id: string) => {
    return this.db
      .from(itemsTable.name)
      .select(itemsTable.columns)
      .where({ [itemsTable.columns.id]: id })
      .first();
  }

  getItemsOfList = async (listId: string) => {
    return this.db
      .from(itemsTable.name)
      .select(itemsTable.columns)
      .where({ [itemsTable.columns.listId]: listId });
  }
}
