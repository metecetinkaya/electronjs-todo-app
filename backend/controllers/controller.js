const Service = require('../services/service');

class Controller {
    async items_get(request, response) {
        if (response.status(200)) {
            const items = await Service.item_get(request.body);

            response.json({
                status: 200,
                items: items
            });
        }
    };

    async item_create (request, response) {
        if (response.status(200)) {
            const items = await Service.item_create(request.body);

            response.json({
                status: 200,
                items: items
            });
        }
    };

    async item_update (request, response) {
        if (response.status(200)) {
            const items = await Service.item_update(request.body);

            response.json({
                status: 200,
                items: items
            });
        }
    };

    async item_delete (request, response) {
        if (response.status(200)) {
            const items = await Service.item_delete(request.body);

            response.json({
                status: 200,
                items: items
            });
        }
    };
}

module.exports = new Controller();