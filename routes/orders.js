const express = require('express');
const checkAdmin = require('../middleware/checkAdmin');
const { 
  getAllOrders, getOrderById, getMyOrders, createOrder, updateOrder} = require('../models/orders');

const orderRouter = express.Router();

orderRouter.get('/', checkAdmin, async (req, res, next) => {
  const orders = await getAllOrders();

  res.send({
    message: 'success',
    data: orders
  });
});

orderRouter.get('/me', async(req, res, next)=>{
  const orders = await getMyOrders(parseInt(req.ususario.id));

  res.send({
    message: 'success',
    data: orders
  });
});

orderRouter.get('/:id', checkAdmin, async (req, res, next) => {
  const orderId = req.params.id;

  const order = await getOrderById(orderId);

  if (order) {
    res.send({ message: 'success', data: order });
  } else {
    res
      .status(404)
      .json({ message: 'order not found'});
  }
});

orderRouter.post('/', async (req, res, next) => {
  const newOrder = {
    ...req.body,
    userId: req.user.id
  };
  const orderSaved = await createOrder(newOrder);

  if (orderSaved) {
    res.send({
      message: 'order created successfuly',
      data: orderSaved
    });
  } else {
    res
      .status(404)
      .json({ message: 'order creation wrongt'});
  }
});

orderRouter.put('/:id', checkAdmin, async (req, res, next) => {
  const orderUpdate = req.body;
  const orderId = parseInt(req.params.id);

  const orderSaved = await updateOrder(orderId, orderUpdate);
  
  if(orderSaved) {
    res.send({
      message: 'order updated successfuly',
      data: orderSaved
    });
  } else {
    res
      .status(404)
      .json({ message: 'order update wrongt'});
  }
});

module.exports = orderRouter;