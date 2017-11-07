import Marionette from 'backbone.marionette';

import template from '../templates/Input.html';
import ItemModel from '../models/Item';

const InputView = Marionette.View.extend({
    template: template,

    modelEvents: {
        change: 'render'
    },

    ui: {
        input: 'input[type="text"]'
    },

    collectionEvents: {
        add: 'itemAdded'
    },

    events: {
        'keypress @ui.input': 'AddItem'
    },

    AddItem: function(e) {
        if(e.keyCode == 13) {
            console.log(e.target.value);
            let item = new ItemModel({
                text: e.target.value,
                completed: false
            });
            this.model.set({
                text: e.target.value,
                completed: false
            }, {validate: true});

            this.collection.add(item);
        }
    },

    itemAdded: function() {
        this.model.set({
            text: '',
            completed: false
        });
        console.log('New Item added');
    }
});


export default InputView;