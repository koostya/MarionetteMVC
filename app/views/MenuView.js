import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import template from '../templates/Menu.html';

const Menu = Marionette.View.extend({
    template: template,

    initialize: function() {
        this.collection.bind('add', this.render);
        this.collection.bind('remove', this.render);
        this.collection.bind('change', this.render);
        this.model.bind('change', this.render);
        this.model.bind('set', this.render);
        this.model.bind('get', this.render);
    },

    render: function() {
        this.setItemsLeft();
        this.defineTab();

        this.model.set({
            collectionLength: this.collection.length
        });

        $(this.el).html(this.template(this.model.toJSON()));

        return this;
    },

    modelEvents: {
        save: 'setItemsLeft'
    },

    ui: {
        clear_completed: '#clear_completed',
        all: '#all',
        active: '#active',
        completed: '#completed'
    },

    events: {
        'click @ui.clear_completed': 'deleteCompletedItems',
        'click @ui.all': 'changeTab',
        'click @ui.active': 'changeTab',
        'click @ui.completed': 'changeTab'
    },

    setItemsLeft: function() {
        let countItemsLeft = 0;

        if(this.collection.length >= 1) {
            for(let i = 0; i < this.collection.models.length; i++) {
                if(this.collection.models[i].get('completed') == false) {
                    countItemsLeft++;
                }
            }

            this.model.set({
                itemsLeft: countItemsLeft,
                collectionLength: this.collection.length
            });

            this.model.save();
            this.model.fetch();
        }
    },

    deleteCompletedItems: function() {
        for(let i = 0; i < this.collection.length; i++) {
            if(this.collection.models[i].get('completed') == true) {
                this.collection.models[i].remove();
            }
        }
    },

    changeTab: function(e) {
        let items = document.querySelectorAll('.item');

        if(e.target.id == 'all') {
            this.loadAll(items);
        }

        if(e.target.id == 'active') {
            this.loadActive(items);
        }

        if(e.target.id == 'completed') {
            this.loadCompleted(items);
        }
    },

    defineTab: function() {
        let items = document.querySelectorAll('.item');

        if(this.collection.length > 0) {
            if(this.model.get('filter') == 'all') {
                this.loadAll(items);
            }

            if(this.model.get('filter') == 'active') {
                this.loadActive(items);
            }

            if(this.model.get('filter') == 'completed') {
                this.loadCompleted(items);
            }
        }
    },

    loadAll: function(items) {
        for(let i = 0; i < items.length; i++) {
            items[i].style.display = 'flex';
        }

        this.model.set({
           filter: 'all'
        });

        this.model.save();
        this.model.fetch();
    },

    loadActive: function(items) {
        for(let i = 0; i < items.length; i++) {
            if(this.collection.models[i].get('completed') == false) {
                items[i].style.display = 'flex';
            } else {
                items[i].style.display = 'none';
            }
        }

        this.model.set({
            filter: 'active'
        });

        this.model.save();
        this.model.fetch();
    },

    loadCompleted: function(items) {
        for(let i = 0; i < items.length; i++) {
            if(this.collection.models[i].get('completed') == true) {
                items[i].style.display = 'flex';
            } else {
                items[i].style.display = 'none';
            }
        }

        this.model.set({
            filter: 'completed'
        });

        this.model.save();
        this.model.fetch();
    }
});

export default Menu;