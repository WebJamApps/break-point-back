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

  async newSubscriber(req:Request, res:Response) {
    if (!this.utils.emailIsValid(req.body.email)) return res.status(400).json({ error: 'email is invalid' });
    const verified = this.utils.generateCode(99999, 10000);
    let data;
    try {
      data = await this.model.create({ email: req.body.email, verified });
    } catch (e) { return res.status(500).json({ error: `failed to create new subscriber, ${e.message}` }); }
    return res.status(201).json(data);
  }

  // // eslint-disable-next-line class-methods-use-this
  // verifySubscriber(req:Request, res:Response) {
  //   console.log(req.body);
  //   // else set verified to 0
  //   return res.status(200).json({ message: JSON.stringify(req.body) });
  // }
}

export default new SubscriberController(SubscriberModel, SubscriberUtils);
