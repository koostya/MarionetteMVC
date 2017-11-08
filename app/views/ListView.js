import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import template from '../templates/ListItem.html';
import ItemModel from '../models/Item';

var ListItem = Marionette.View.extend({
    tagName: 'li',
    template: template,

    ui: {
        editInput: 'input'
    },

    triggers: {
        'dblclick': 'remove:item',
        'contextmenu': 'edit:item',
        'blur @ui.editInput': 'input:blur'
    }
});

var List = Marionette.CollectionView.extend({
    tagName: 'ul',
    childView: ListItem,

    childViewEvents: {
        'remove:item': 'removeItem',
        'edit:item': 'editItem',
        'input:blur': 'onInputBlur'
    },

    removeItem: function(child) {
        child.model.destroy({
            success: function() {
                console.log('Item with id = '+ child.model.cid +' was removed');
            }
        });
    },

    editItem: function(child) {
        let input = document.createElement('input');
        input.style.position = 'absolute';
        input.style.width = '100%';
        input.style.height = '100%';
        input.style.top = '0';
        input.style.left = '0';
        input.style.width = '173px  ';
        input.value = child.el.innerHTML;
        child.el.appendChild(input);
        child.el.style.position = 'relative';
    },

    onInputBlur: function(child) {
        let item = new ItemModel({
            text: child.el.children[0].value,
            completed: false
        });

        item.set({
            text: child.el.children[0].value,
            completed: false
        }, {validate: true});

        child.el.children[0].parentNode.removeChild(child.el.children[0]);

        this.collection.add(item);
        this.model.save(item);
        this.model.fetch(item);
    }
});

export default List;