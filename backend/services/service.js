var Items = require('../models/items');

class Service {
    async item_get(request) {
        try {
            const items = await Items.find(request);

            return items;
        } catch (err) {
            throw Error(`Error while Getting Todos: ${err}`)
        }
    }

    async item_create (request) {
        try {
            const items = await Items.find({});
    
            const itemIds = items.map(item => item.id);
            const orderNumbers = items.map(item => item.order);
    
            const newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
            const newOrderNumber = orderNumbers.length > 0 ? Math.max.apply(Math, orderNumbers) + 1 : 1;

            const item = await Items.create({
                id: newId,
                title: request.title,
                description: request.description,
                order: newOrderNumber,
                completed: false,
                create: new Date()
            });

            console.log(`Item Created - Id: ${item.id}`);

            return item;
        } catch (err) {
            throw Error(`Error while Creating Todo: ${err}`)
        }
    }

    async item_update (request) {
        try {
            await Items.findOneAndUpdate(request.id, request)

            const item = await Items.findOne({id: request.id});

            console.log(`Item Updated - Id: ${item.id}`);

            return item;
        } catch (err) {
            throw Error(`Error while Updating Todo: ${err}`)
        }
    }

    async item_delete (request) {
        try {
            const item = await Items.findOneAndDelete(request)

            console.log(`Item Deleted - Id: ${item.id}`);

            return item;
        } catch (err) {
            throw Error(`Error while Deleting Todo: ${err}`)
        }
    }
}

module.exports = new Service();