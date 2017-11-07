import Marionette from 'backbone.marionette';

const InputController = Marionette.Object.extend({
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
    }
});

export default InputController;