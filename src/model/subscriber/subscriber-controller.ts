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

  newSubscriber(req:Request, res:Response) {
    if (!this.utils.emailIsValid(req.body.email)) return res.status(400).json({ error: 'email is invalid' });
    const verified = this.utils.generateCode(99999, 10000);
    let data;
    try {
      data = this.model.create({ email: req.body.email, verified });
    } catch (e) { return res.status(500).json({ error: `failed to create new subscriber, ${e.message}` }); }
    return res.status(201).json(data);
  }

  // async signup(req: any, res: any) {
  //   let existingUser;
  //   const randomNumba = this.authUtils.generateCode(99999, 10000);
  //   const user = {
  //     name: req.body.name,
  //     verifiedEmail: false,
  //     email: req.body.email,
  //     password: req.body.password,
  //     isPswdReset: false,
  //     resetCode: randomNumba,
  //   };
  //   const validData = this.model.validateSignup ? this.model.validateSignup(user) : /* istanbul ignore next */'';
  //   if (validData !== '') return res.status(400).json({ message: validData });
  //   try { existingUser = await this.model.findOne({ email: req.body.email }); } catch (e) { return this.resErr(res, e); }
  //   if (existingUser && existingUser.verifiedEmail) {
  //     return res.status(409).json({ message: 'This email address is already registered' });
  //   }
  //   if (existingUser && !existingUser.verifiedEmail) {
  //     try { await this.model.findByIdAndRemove(existingUser._id); } catch (e) { return this.resErr(res, e); }
  //   }
  //   return this.finishSignup(res, user, randomNumba);
  // }

  // eslint-disable-next-line class-methods-use-this
  verifySubscriber(req:Request, res:Response) {
    console.log(req.body);// TODO validate that this email exists and the verified code matches, then set verified to 1
    // else set verified to 0
    return res.status(200).json({ message: JSON.stringify(req.body) });
  }
}

export default new SubscriberController(SubscriberModel, SubscriberUtils);
