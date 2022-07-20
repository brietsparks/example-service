import { createSqlFileMigration } from '../util';

const { up, down } = createSqlFileMigration({
  upFile: `${__dirname}/../sql/0001.up.sql`,
  downFile: `${__dirname}/../sql/0001.down.sql`
})

export { up, down };
