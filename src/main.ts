import { createApp } from './app';

import dotenv from 'dotenv';

dotenv.config();
const env = process.env;
const app = createApp({
  db: {
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    host: env.DB_HOST,
    database: env.DB_DATABASE,
    port: 5432
  }
});

const action = process.argv[2];
if (!action || action === 'serve') {
  app.server.listen(env.PORT, () => {
    console.log(`listening on port ${env.PORT}`)
  });
}
if (action === 'db:up') {
  app.db.migrate.up().then(process.exit);
}
if (action === 'db:down') {
  app.db.migrate.down().then(process.exit);
}
