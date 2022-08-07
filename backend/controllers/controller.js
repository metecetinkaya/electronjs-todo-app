const Service = require('../services/service');

class Controller {
    async items_get(request, response) {
        if (response.status(200)) {
            const items = await Service.item_get(request.body);

            response.json({
                status: 200,
                data: items
            });
        }
    };

    async item_create (request, response) {
        if (response.status(200)) {
            await Service.item_create(request.body);

            response.send('success created');
        }
    };

    async item_update (request, response) {
        if (response.status(200)) {
            await Service.item_update(request.body);

            response.send('success updated');
        }
    };

    async item_delete (request, response) {
        if (response.status(200)) {
            await Service.item_delete(request.body);

            response.send('success deleted');
        }
    };
}

module.exports = new Controller();