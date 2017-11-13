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


    },

    render: function() {
        this.setItemsLeft();
        this.defineCompletedItems();
        this.defineTab();
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
    },

    changeTab: function(e) {
        let tabs = this.$('.tabs .active'),
            items = document.querySelectorAll('.item');

        for(let i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
        }

        if(e.target.id == 'all') {
            this.loadAll(items);
            this.$('#all')[0].classList.add('active');
        }

        if(e.target.id == 'active') {
            this.loadActive(items);
            this.$('#active')[0].classList.add('active');
        }

        if(e.target.id == 'completed') {
            this.loadCompleted(items);
            this.$('#completed')[0].classList.add('active');
        }
    },

    defineTab: function() {
        let tabs = this.$('.tab'),
            items = document.querySelectorAll('.item');
        if(this.collection.length > 0) {
            if(this.collection.filter.getVal() == 'all') {
                this.loadAll(items);
                this.$('#all')[0].classList.add('active');
            }

            if(this.collection.filter.getVal() == 'active') {
                this.loadActive(items);
                this.$('#active')[0].classList.add('active');
            }

            if(this.collection.filter.getVal() == 'completed') {
                this.loadCompleted(items);
                this.$('#completed')[0].classList.add('active');
            }
        }
    },

    loadAll: function(items) {
        for(let i = 0; i < items.length; i++) {
            items[i].style.display = 'flex';
        }
        this.collection.filter.setVal('all');
    },

    loadActive: function(items) {
        this.model.save();
        this.model.fetch();
        for(let i = 0; i < items.length; i++) {
            if(!$('#list li')[i].classList.contains('completed')) {
                items[i].style.display = 'flex';
            } else {
                items[i].style.display = 'none';
            }
        }
        this.collection.filter.setVal('active');
    },

    loadCompleted: function(items) {
        this.model.save();
        this.model.fetch();
        for(let i = 0; i < items.length; i++) {
            if($('#list li')[i].classList.contains('completed')) {
                items[i].style.display = 'flex';
            } else {
                items[i].style.display = 'none';
            }
        }
        this.collection.filter.setVal('completed');
    }
});

export default Menu;