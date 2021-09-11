const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const ItemSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    order: {
        type: Number
    }
});

ItemSchema.plugin(AutoIncrement, {id:'order_seq',inc_field: 'order'});
module.exports = Item = mongoose.model('item', ItemSchema);
//module.exports = Office = mongoose.model("office", UserSchema);

module.exports.getItems = function (callback, limit) {
    Item.find(callback).limit(limit);
}

module.exports.addItem = function (item, callback) {
    Item.create(item, callback);
}

module.exports.deleteItem = function (key, callback) {
    var query = { key: key };
    Item.remove(query, callback);
}

module.exports.deleteItems = function (status, callback) {
    var query = { status: status };
    Item.remove(query, callback);
}

module.exports.updateItem = function (key, item, options, callback) {
    var query = { key: key };
    var update = {
        text: item.text,
        key: item.key,
        status: item.status
    }
    Item.updateOne(query, update, {}, callback);
}

module.exports.updateItem = function (key, item, options, callback) {
    var query = { key: key };
    var update = {
        text: item.text,
        key: item.key,
        status: item.status
    }
    Item.updateOne(query, update, {}, callback);
}

module.exports.updateAllItem = function (callback) {
    console.log("Update All");
    Item.update({}, { $set: { "status": "completed" } }, { "multi": true }, callback);
}

module.exports.changeItemsOrder = function (items, callback) {
    var query = Item.remove({}, callback);
    assert.ok(!(query instanceof Promise));

    // A query is not a fully-fledged promise, but it does have a `.then()`.
    query.then(function (doc) {
        // use doc
    });

    // `.exec()` gives you a fully-fledged promise
    var promise = query.exec();
    assert.ok(promise instanceof Promise);

    promise.then(function (doc) {
        // use doc
    });
}