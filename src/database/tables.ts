import { table } from './util';

export const listsTable = table('lists', {
  id: 'id',
  creationTimestamp: 'creation_timestamp',
  name: 'name',
});

export const itemsTable = table('items', {
  id: 'id',
  creationTimestamp: 'creation_timestamp',
  listId: 'list_id',
  name: 'name',
});
