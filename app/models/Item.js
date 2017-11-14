import Backbone from 'backbone';

const Item = Backbone.Model.extend({
   defaults: {
       text: '',
       completed: false,
       checkboxID: '',
       checked: '',
       editing: false,
       itemsLeft: 0,
       chooseAll: '',
       chooseAllShow: false
   },

    url: 'items',

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