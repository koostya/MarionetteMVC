import Backbone from 'backbone';

const Item = Backbone.Model.extend({
   defaults: {
       text: '',
       completed: false
   },

    initialize: function() {

    },

    remove: function() {
        this.destroy();
    },

    validate: function(args) {

    }
});

export default Item;