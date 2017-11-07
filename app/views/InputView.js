import Marionette from 'backbone.marionette';

import template from '../templates/Input.html';

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
            this.model.set({
                text: e.target.value,
                completed: false
            }, {validate: true});

            let items = this.model.pick('text', 'completed');
            this.collection.add(items);
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