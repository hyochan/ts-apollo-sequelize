import bodyParser from 'body-parser';
import cors from 'cors';
import ejs from 'ejs';
import express from 'express';
import path from 'path';
import routes from './routers/root';

require('dotenv').config();

export const createApp = (): express.Application => {
  const app: express.Application = express();

  app.use(express.static(path.join(__dirname, '../public')));
  app.use(express.static(path.join(__dirname, '../views')));

  app.set('views', path.join(__dirname, '../views'));
  app.engine('html', ejs.renderFile);
  app.set('view engine', 'html');

  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  app.use(cors());

  app.use('/', routes);

  return app;
};
