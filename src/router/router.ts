import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { Repositories } from '../repositories';

import { makeErrorHandlingMiddleware, withErrorHandling } from './error-middleware';

export function makeRouter(repositories: Repositories) {
  const router = express();

  router.use(cors({
    origin: ['http://localhost:3001']
  }));

  router.use(bodyParser.json());

  const errorMiddleware = makeErrorHandlingMiddleware(console.error);

  router
    .get('/health', (req, res) => {
      res.json({ ok: 1 });
    })
    .post('/lists', withErrorHandling(async (req, res) => {
      const data = await repositories.listsRepository.createList(req.body);
      res.json({ data });
    }))
    .get('/lists', withErrorHandling(async (req, res) => {
      const data = await repositories.listsRepository.getAllLists();
      res.json({ data });
    }))
    .get('/lists/:id', withErrorHandling(async (req, res) => {
      const data = await repositories.listsRepository.getList(req.params.id);
      res.json({ data });
    }))
    .post('/lists/:listId/items', withErrorHandling(async (req, res) => {
      const data = await repositories.itemsRepository.createItem({
        listId: req.params.listId,
        ...req.body
      });
      res.json({ data });
    }))
    .get('/lists/:listId/items', withErrorHandling(async (req, res) => {
      const data = await repositories.itemsRepository.getItemsOfList(req.params.listId);
      res.json({ data });
    }))
    .get('/items/:id', withErrorHandling(async (req, res) => {
      const data = await repositories.itemsRepository.getItem(req.params.id);
      res.json({ data });
    }))

  router.use(errorMiddleware);

  return router;
}
