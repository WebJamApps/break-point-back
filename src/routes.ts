import express, { Express } from 'express';
import user from './model/user/user-router';
import book from './model/book/book-router';
import email from './model/email/email-router';

const router = express.Router();

export default function route(app: Express, baseUrl:string): void {
  app.use(router);
  router.use(`${baseUrl}/user`, user);
  router.use(`${baseUrl}/book`, book);
  router.use(`${baseUrl}/email`, email);
}
