const Service = require('../services/service');

class Controller {
    items_get (request, response) {
        response.status(200).send(Service.items_get());
    };
    
    item_get (request, response) {
        response.status(200).send(Service.item_get(request));
    };
    
    item_create (request, response) {
        response.status(200).send(Service.item_create(request));
    };
    
    item_update (request, response) {
        response.status(200).send(Service.item_update(request));
    };
    
    item_delete (request, response) {
        response.status(200).send(Service.item_delete(request));
    };
}

module.exports = new Controller();
