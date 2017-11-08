import Backbone from 'backbone';
import {LocalStorage} from 'backbone.localstorage';

const Item = Backbone.Model.extend({
   defaults: {
       text: '',
       completed: false
   },

    validate: function(args) {

    }
});

export default Item;