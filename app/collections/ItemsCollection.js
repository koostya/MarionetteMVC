import Backbone from 'backbone';
import {LocalStorage} from 'backbone.localstorage';

import ItemModel from '../models/Item';

const ItemsCollection = Backbone.Collection.extend({
    model: ItemModel,

    initialize: function() {
        this.fetch();
    },

    localStorage: new LocalStorage('ItemsList')
});

export default ItemsCollection;