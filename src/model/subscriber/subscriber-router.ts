import express from 'express';
import controller from './subscriber-controller';
import authUtils from '../../auth/authUtils';
import routeUtils from '../../lib/routeUtils';

const router = express.Router();

routeUtils.setRoot(router, controller, authUtils);
router.route('/new')
  .post((req, res) => controller.newSubscriber(req, res));
router.route('/one')
  .get((req, res) => controller.findOne(req, res))
  .put(authUtils.ensureAuthenticated, (req, res) => controller.findOneAndUpdate(req, res));
routeUtils.byId(router, controller, authUtils);

export default router;
