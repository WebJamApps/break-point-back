import type { Request, Response } from 'express';
import Controller from '../../lib/controller';
import SubscriberModel from './subscriber-facade';
import SubscriberUtils from './subscriber.utils';

class SubscriberController extends Controller {
  utils: typeof SubscriberUtils;

  constructor(model: typeof SubscriberModel, Utils: typeof SubscriberUtils) {
    super(model);
    this.utils = Utils;
  }

  // eslint-disable-next-line class-methods-use-this
  newSubscriber(req:Request, res:Response) {
    console.log(req.body);
    if (!this.utils.emailIsValid(req.body.email)) return res.status(400).json({ error: 'email is invalid' });
    // TODO create a new subscriber with given email and random number for verified
    // TODO validate email
    // TODO generate  5 digit random number
    // TODO send email to this user with link to verify and using this code
    // TODO if email exists and verified === 0, make a new verified code and send email to user again
    return res.status(201).json({ message: JSON.stringify(req.body) });
  }

  // eslint-disable-next-line class-methods-use-this
  verifySubscriber(req:Request, res:Response) {
    console.log(req.body);// TODO validate that this email exists and the verified code matches, then set verified to 1
    // else set verified to 0
    return res.status(200).json({ message: JSON.stringify(req.body) });
  }
}

export default new SubscriberController(SubscriberModel, SubscriberUtils);
