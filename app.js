require('dotenv').config()
const express = require('express')
const knex = require('knex')

const app = express()

const port = 8080;

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_DATABASE = process.env.DB_DATABASE;

const db = knex({
    client: 'pg',
    connection: `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:5432/${DB_DATABASE}`
})

console.log(DB_HOST, DB_DATABASE);
app.get('/', async (req, res) => {
    try {
        await db.raw('select 1');
        const result = 'connected to db';
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        const result = 'failed to connect to db';
        console.log(result);
        res.status(200).json({ result });
    }
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
