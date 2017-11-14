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
        this.model.bind('remove', this.render);
    },

    render: function() {
        $(this.el).html(this.template(this.model.toJSON()));

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

    initialize: function(child) {
        this.model.save();
        this.model.fetch();
    },

    removeItem: function(child) {
        child.model.remove();
        this.model.remove();
    },

    editItem: function(child) {
        child.model.set({
           editing: true
        });
    },

    confirmChangesOfItem: function(child) {
        let editInput = child.el.children[0].children[3];

        child.model.set({
            text: editInput.value,
            editing: false
        }, {validate: true});

        this.model.set({
            text: editInput.value,
            editing: false
        }, {validate: true});

        child.model.save();
        this.model.save();
    },

    itemComplete: function(child) {
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
        child.model.save();
        this.model.save();
    }
});

export default List;