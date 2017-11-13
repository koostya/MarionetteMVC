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

    filter: {
        value: 'all',

        setVal: function(value) {
            this.value = value;
        },

        getVal: function() {
            return this.value;
        }
    },

    localStorage: new LocalStorage('ItemsList')
});

export default ItemsCollection;