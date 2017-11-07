import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import template from '../templates/ListItem.html';

var ListItem = Marionette.View.extend({
    tagName: 'li',
    template: template,

    triggers: {
        'click p': 'remove:item'
    }
});

var List = Marionette.CollectionView.extend({
    tagName: 'ul',
    childView: ListItem,

    childViewEvents: {
        'remove:item': 'removeItem'
    },

    removeItem: function(child) {
        console.log(child.model.destroy({
            success: function() {
                console.log('Item with id = '+ child.model.cid +' was removed');
            }
        }
    ));
    }
});

export default List;