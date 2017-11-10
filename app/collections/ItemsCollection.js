import Backbone from 'backbone';
import {LocalStorage} from 'backbone.localstorage';

import ItemModel from '../models/Item';

const ItemsCollection = Backbone.Collection.extend({
    model: ItemModel,

    url: 'items',

    initialize: function() {
        this.fetch();
        this.bind('change', this.render);
    },

    render: function() {

    },

    localStorage: new LocalStorage('ItemsList')
});

export default ItemsCollection;