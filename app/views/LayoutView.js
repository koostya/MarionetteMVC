import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import InputView from './InputView';
import ListView from'./ListView';

import template from '../templates/Layout.html';

const LayoutView = Marionette.View.extend({
    el: '#mvc',

    template: template,

    regions: {
        input: '#input',
        list: '#list'
    },

    onShow: function() {
        this.showChildView('input', new InputView({model: this.model, collection: this.collection}));
        this.showChildView('list', new ListView({model: this.model, collection: this.collection}));
    }
});

export default LayoutView;