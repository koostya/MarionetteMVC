import Backbone from 'backbone';

const Menu = Backbone.Model.extend({
    defaults: {
        itemsLeft: 0,
        filter: 'all',
        collectionLength: 0
    },

    url: 'items',

    remove: function() {
        this.destroy();
    },

    validate: function(args) {

    }
});

export default Menu;