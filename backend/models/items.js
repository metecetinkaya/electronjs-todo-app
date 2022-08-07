const { model, Schema } = require('mongoose');

const ItemSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    create: {
        type: Date,
        required: true,
    }
});

module.exports = model('Item', ItemSchema);