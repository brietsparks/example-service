import { makeKnexClient } from './database';
import { makeRepositories } from './repositories';
import { makeRouter } from './router';

export type App = ReturnType<typeof createApp>;

export interface AppParams {
  db: {
    user: string;
    password: string;
    host: string;
    database: string;
    port: number;
  };
}

export function createApp(params: AppParams) {
  const db = makeKnexClient({
    connection: params.db
  });

  const repositories = makeRepositories(db);

  const server = makeRouter(repositories);

  return {
    db,
    repositories,
    server
  };
}
