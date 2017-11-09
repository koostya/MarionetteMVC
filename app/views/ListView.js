import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import template from '../templates/ListItem.html';
import ItemModel from '../models/Item';

var ListItem = Marionette.View.extend({
    tagName: 'li',
    template: template,

    // initialize: function() {
    //     this.model.bind('change', this.render);
    // },
    //
    // render: function() {
    //     let text = this.model.get('text');
    //
    //     console.log(this.$('.text > span').text());
    // },

    ui: {
        remove: '.remove',
        edit: '.item',
        editInput: '.updateInput'
    },

    triggers: {
        'click @ui.remove': 'remove:item',
        'dblclick @ui.edit': 'edit:item',
        'blur @ui.editInput': 'edit:confirm'
    }
});

var List = Marionette.CollectionView.extend({
    tagName: 'ul',
    childView: ListItem,

    childViewEvents: {
        'remove:item': 'removeItem',
        'edit:item': 'editItem',
        'input:blur': 'onInputBlur',
        'edit:confirm': 'confirmChangesOfItem'
    },

    removeItem: function(child) {
        child.model.remove();
    },

    editItem: function(child) {
        child.el.classList.add('edit');
        let editInput = child.el.children[0].children[3].value;
        console.log(child.el.children[0].children[3].value);
    },

    confirmChangesOfItem: function(child) {
        let editInput = child.el.children[0].children[3];
        child.model.set({
            text: editInput.value
        }, {validate: true});
        child.model.save();
        editInput.style.display = 'none';
    }
});

export default List;