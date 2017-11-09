import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import InputView from './InputView';
import ListView from'./ListView';
import ItemsCollection from '../collections/ItemsCollection';

import template from '../templates/Layout.html';

const LayoutView = Marionette.View.extend({
    el: '#mvc',

    template: template,

    regions: {
        input: '.main_input_wrapper',
        list: '#list'
    },

    onShow: function() {
        this.showChildView('input', new InputView({model: this.model, collection: this.collection}));
        this.showChildView('list', new ListView({model: this.model, collection: this.collection}));
    },

    initialize: function() {
        this.collection.fetch();
    }
});

export default LayoutView;