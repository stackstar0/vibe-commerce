import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

const MOCK_USER_ID = process.env.MOCK_USER_ID || 'user_123456';

// Generate unique order ID
const generateOrderId = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD-${timestamp}-${random}`;
};

// @desc    Process checkout and create order
// @route   POST /api/checkout
// @access  Public (with mock user)
export const processCheckout = async (req, res) => {
  try {
    const { cartItems, customerInfo } = req.body;

    // Validation
    if (!customerInfo || !customerInfo.name || !customerInfo.email) {
      return res.status(400).json({
        success: false,
        error: 'Customer name and email are required',
      });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Cart is empty',
      });
    }

    // Calculate total
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create order
    const order = await Order.create({
      orderId: generateOrderId(),
      userId: MOCK_USER_ID,
      items: cartItems.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total,
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        phone: customerInfo.phone || '',
        address: customerInfo.address || '',
      },
      timestamp: new Date(),
    });

    // Clear the cart after successful order
    const cart = await Cart.findOne({ userId: MOCK_USER_ID });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    // Return receipt
    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      receipt: {
        orderId: order.orderId,
        items: order.items,
        total: order.total,
        customerInfo: order.customerInfo,
        timestamp: order.timestamp,
        status: order.status,
      },
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process checkout',
      message: error.message,
    });
  }
};

// @desc    Get all orders for user
// @route   GET /api/orders
// @access  Public (with mock user)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: MOCK_USER_ID }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch orders',
      message: error.message,
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:orderId
// @access  Public (with mock user)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
      userId: MOCK_USER_ID,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch order',
      message: error.message,
    });
  }
};
