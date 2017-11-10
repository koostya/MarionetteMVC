import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import template from '../templates/Menu.html';

const Menu = Marionette.View.extend({
    template: template,

    initialize: function() {
        this.collection.bind('add', this.render);
        this.collection.bind('remove', this.render);
        this.collection.bind('change', this.render);
    },

    render: function() {
        this.setItemsLeft();
        this.defineCompletedItems();
    },

    ui: {
        clear_completed: '#clear_completed'
    },

    events: {
        'click @ui.clear_completed': 'deleteCompletedItems'
    },

    setItemsLeft: function() {
        if(this.collection.length >= 1) {
            $(this.el).html(this.template(template));
            let itemsLeft = this.$('.items_left > span'),
                countItemsLeft = 0;
            for(let i = 0; i < this.collection.models.length; i++) {
                if(this.collection.models[i].get('completed') == false) {
                    countItemsLeft++;
                }
            }
            itemsLeft.text(countItemsLeft);
        } else {
            $(this.el).html('');
        }
    },

    defineCompletedItems: function() {
        let count = 0;
        for(let i = 0; i < this.collection.models.length; i++) {
            if(this.collection.models[i].get('completed') == true) {
                count++;
            }
        }
        if(count > 0) {
            this.$('#clear_completed').css('visibility', 'visible');
        } else {
            this.$('#clear_completed').css('visibility', 'hidden');
        }
    },

    deleteCompletedItems: function() {
        for(let i = 0; i < this.collection.length; i++) {
            if(this.collection.models[i].get('completed') == true) {
                this.collection.models[i].remove();
            }
        }
    }
});

export default Menu;