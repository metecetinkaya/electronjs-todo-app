let data = [
    { id: 1, title: 'Create a project',  order: 1, completed: true, createdOn: new Date() },
    { id: 2, title: 'Take a cofféé',     order: 2, completed: true, createdOn: new Date() },
    { id: 3, title: 'Write new article', order: 3, completed: true, createdOn: new Date() },
    { id: 4, title: 'Walk toward home', order: 4, completed: false, createdOn: new Date() },
    { id: 5, title: 'Have some dinner', order: 5, completed: false, createdOn: new Date() },
];


class Service {
    items_get () {
        return data;
    }

    item_get (request) {    
        return data.find(item => item.id === parseInt(request.params.id));
    }

    item_create (request) {
        let itemIds = data.map(item => item.id);
        let orderNums = data.map(item => item.order);

        let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
        let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

        let newItem = {
            id: newId,
            title: request.body.title,
            order: newOrderNum,
            completed: false,
            createdOn: new Date()
        };

        data.push(newItem);

        return newItem;
    }

    item_update (request) {    
        let found = data.find(item => item.id === parseInt(request.params.id));
    
        if (found) {
            let updated = {
                id: found.id,
                title: request.body.title,
                order: request.body.order,
                completed: request.body.completed
            };
    
            let targetIndex = data.indexOf(found);
    
            data.splice(targetIndex, 1, updated);
        }
    }

    item_delete (request) {    
        let found = data.find(item => item.id === parseInt(request.params.id));
    
        if (found) {
            let targetIndex = data.indexOf(found);
    
            data.splice(targetIndex, 1);
        }
    }
}

module.exports = new Service();
