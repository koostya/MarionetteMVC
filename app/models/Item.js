import Backbone from 'backbone';

const Item = Backbone.Model.extend({
   defaults: {
       text: '',
       completed: false
   },

    validate: function(args) {
       console.log(args);
    }
});

export default Item;