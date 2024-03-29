import path from 'path';
import dotenv from 'dotenv';
import Debug from 'debug';
import supportsColor from 'supports-color';
import express from 'express';
import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import enforce from 'express-sslify';
import routes from './routes';

dotenv.config();
const debug = Debug('break-point-back:index');
/* istanbul ignore else */
if (supportsColor.stdout) debug('Terminal stdout supports color');

const corsOptions = {
  origin: JSON.parse(process.env.AllowUrl || /* istanbul ignore next */'{}').urls,
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
const app = express();

/* istanbul ignore next */
if (process.env.NODE_ENV === 'production' && process.env.BUILD_BRANCH === 'main') app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(express.static(path.normalize(path.join(__dirname, '../breakpointministries/dist'))));
app.use(cors(corsOptions));
let mongoDbUri: string = process.env.MONGO_DB_URI || /* istanbul ignore next */'';
/* istanbul ignore else */
if (process.env.NODE_ENV === 'test') mongoDbUri = process.env.TEST_DB || /* istanbul ignore next */'';
mongoose.connect(mongoDbUri, {});
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    'default-src': ["'self'"],
    'base-uri': ["'self'"],
    'block-all-mixed-content': [],
    'font-src': ["'self'", 'https:', 'data:'],
    'frame-src': ["'self'", 'https://accounts.google.com', 'https://www.facebook.com', 'https://open.spotify.com',
      'https://w.soundcloud.com', 'https://www.youtube.com'],
    'frame-ancestors': ["'self'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'media-src': ["'self'", 'https://dl.dropboxusercontent.com'],
    'object-src': ["'none'"],
    'script-src': ["'self'", 'https://maps.googleapis.com', 'https://apis.google.com', 'https://cdn.tiny.cloud',
      'https://w.soundcloud.com', 'https://www.youtube.com', 'https://s.ytimg.com', 'https://cdnjs.cloudflare.com'],
    'script-src-attr': ["'none'"],
    'style-src': ["'self'", 'https:', "'unsafe-inline'"],
    'upgrade-insecure-requests': [],
    'connect-src': ["'self'", 'ws:', 'wss:'],
  },
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
routes(app, '/api');
app.get('*', (req, res) => {
  res.sendFile(path.normalize(path.join(__dirname, '../breakpointministries/dist/index.html')));
});
app.use((_req, res) => res.status(404).send('not found'));
/* istanbul ignore next */
app.use((err:{ status:number, message:string }, _req:Request, res: Response) => res.status(500).json({ message: err.message, error: err }));

/* istanbul ignore if */if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 7000;
  app.listen(port, async () => {
    debug('running in debug mode');
    console.log(`Magic happens on port ${port}`); // eslint-disable-line no-console
  });
}

debug(`isTTY?: ${process.stderr.isTTY}`);
export default app;
