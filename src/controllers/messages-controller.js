const MessagesServices = require('../service/messages-service');

module.exports = {

  async store(req, res) {

    const messagesService = new MessagesServices();

    const body = { id: codigo, itens: [ { name: nome, id: codigo, price: preco } ] } = req.body;

    const response = await messagesService.create('POST', body);

    if (!response) {
      return res.json().status(204)
    }

    return res.send(response);
  }
}