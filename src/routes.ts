import express, { Express } from 'express';
import user from './model/user/user-router';
import book from './model/book/book-router';
import inquiry from './model/inquiry';

const router = express.Router();

export default function route(app: Express): void {
  app.use(router);
  router.use('/user', user);
  router.use('/book', book);
  router.use('/inquiry', inquiry);
}
