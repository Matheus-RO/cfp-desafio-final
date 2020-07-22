const express = require('express');
const transactionRouter = express.Router();
const service = require('../services/transactionService.js');

transactionRouter.post('/', service.create);
transactionRouter.get('/', service.findAll);
transactionRouter.get('/:id', service.findOne);
transactionRouter.put('/:id', service.update);
transactionRouter.delete('/:id', service.remove);
// transactionRouter.delete('/', controller.removeAll);

module.exports = transactionRouter;
