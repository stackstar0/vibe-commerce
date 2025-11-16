import express from 'express';
import {
  processCheckout,
  getOrders,
  getOrderById,
} from '../controllers/checkoutController.js';

const router = express.Router();

router.post('/', processCheckout);
router.get('/orders', getOrders);
router.get('/orders/:orderId', getOrderById);

export default router;
