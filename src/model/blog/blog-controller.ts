// import { Request, Response } from 'express';
import Controller from '../../lib/controller';
import blogModel from './blog-facade';

class BookController extends Controller {
  // findCheckedOut(req: Request, res: Response) {
  //   return this.model.find({ checkedOutBy: req.params.id })
  //     .then((collection: any) => res.status(200).json(collection));
  // }
}

export default new BookController(blogModel);
