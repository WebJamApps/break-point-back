import type { Request, Response } from 'express';
import Controller from '../../lib/controller';
import subscriberModel from './subscriber-facade';

class SubscriberController extends Controller {
  // eslint-disable-next-line class-methods-use-this
  newSubscriber(req:Request, res:Response) {
    console.log(req.body);
    return res.status(200).json({ message: JSON.stringify(req.body) });
  }
}

export default new SubscriberController(subscriberModel);
