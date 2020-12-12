const { Router } = require('express');
const MessagesController = require('../controllers/messages-controller');
const routes = Router();

routes.post('/', MessagesController.store);

module.exports = routes;