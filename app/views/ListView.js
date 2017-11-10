import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import template from '../templates/ListItem.html';

const ListItem = Marionette.View.extend({
    tagName: 'li',
    template: template,

    initialize: function() {
        this.model.bind('change', this.render);
        this.model.bind('set', this.render);
        this.model.bind('get', this.render);
        console.log('init', this.model);
        // this.collection.bind('change', this.render);
    },

    render: function() {
        let text = this.model.get('text');
        $(this.el).html(this.template(this.model.toJSON()));

        console.log('render', this.model);

        if(this.model.get('completed') == true) {

            this.el.classList.add('completed');
        } else {
            this.el.classList.remove('completed');
        }
        this.model.save();
        this.model.fetch();

        return this;
    },

    ui: {
        remove: '.remove',
        edit: '.item',
        editInput: '.updateInput',
        complete: '.checkbox > input'
    },

    triggers: {
        'click @ui.remove': 'remove:item',
        'dblclick @ui.edit': 'edit:item',
        'blur @ui.editInput': 'edit:confirm',
        'change @ui.complete': 'item:complete'
    }
});

var List = Marionette.CollectionView.extend({
    tagName: 'ul',
    childView: ListItem,

    childViewEvents: {
        'remove:item': 'removeItem',
        'edit:item': 'editItem',
        'edit:confirm': 'confirmChangesOfItem',
        'item:complete': 'itemComplete'
    },

    initialize: function() {
        this.model.fetch();
    },

    removeItem: function(child) {
        child.model.remove();
    },

    editItem: function(child) {
        child.el.classList.add('edit');
        let editInput = child.el.children[0].children[3].value;
    },

    confirmChangesOfItem: function(child) {
        let editInput = child.el.children[0].children[3];
        child.model.set({
            text: editInput.value
        }, {validate: true});
        child.model.save();
        child.el.classList.remove('edit');
    },

    itemComplete: function(child) {
        console.log('item complete', child);
        if(child.model.get('completed') == false) {
            child.model.set({
                completed: true,
                checked: 'checked'
            });
        } else {
            child.model.set({
                completed: false,
                checked: ''
            });
        }
        this.model.save();
        this.model.fetch();
    }
});

export default List;