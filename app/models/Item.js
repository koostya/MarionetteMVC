import Backbone from 'backbone';

const Item = Backbone.Model.extend({
   defaults: {
       text: '',
       completed: false,
       checkboxID: '',
       checked: ''
   },

    initialize: function() {

    },

    remove: function() {
        this.destroy();
    },

    validate: function(args) {

    },

    createCheckboxID: function() {
       let id = +new Date();
       return id;
    }
});

export default Item;