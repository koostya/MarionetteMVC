import Marionette from 'backbone.marionette';

import template from '../templates/Input.html';
import ItemModel from '../models/Item';

const InputView = Marionette.View.extend({
    template: template,

    modelEvents: {
        change: 'render'
    },

    initialize: function() {
        this.collection.bind('add', this.render);
        this.collection.bind('remove', this.render);
        this.collection.bind('change', this.render);
        this.model.bind('change', this.render);
        this.model.bind('set', this.render);
        this.model.bind('destroy', this.render);
    },

    render: function() {
        this.checkIsAllItemsCompleted();
        this.showChooseAll();

        $(this.el).html(this.template(this.model.toJSON()));

        return this;
    },

    ui: {
        input: 'input[type="text"]',
        selectAllBut: '.choose_all'
    },

    collectionEvents: {
        add: 'itemAdded'
    },

    events: {
        'keypress @ui.input': 'AddItem',
        'change @ui.selectAllBut': 'CompleteAllItems'
    },

    showChooseAll: function() {
        if(this.collection.length >= 1) {
            this.model.set({
                chooseAllShow: true
            });
        } else {
            this.model.set({
                chooseAllShow: false
            });
        }
    },

    AddItem: function(e) {
        if(e.keyCode == 13) {
            let item = new ItemModel({
                text: e.target.value,
                completed: false,
                checkboxID: this.model.createCheckboxID(),
                checked: ''
            });
            this.collection.create(item);

            this.model.set(item);
            this.model.save(item);
            this.model.fetch(item);
        }
    },

    itemAdded: function() {
        console.log('New Item added');
    },

    CompleteAllItems: function() {
        let completed, checked;

        if(this.model.get('chooseAll') == 'checked') {
            completed = false;
            checked = '';
        } else {
            completed = true;
            checked = 'checked';
        }

        for(let i = 0; i < this.collection.models.length; i++) {
            this.collection.models[i].set({
                completed: completed,
                checked: checked
            });
            this.collection.models[i].save();
        }
    },

    checkIsAllItemsCompleted: function() {
        let count = 0;

        for(let i = 0; i < this.collection.models.length; i++) {
            if(this.collection.models[i].get('completed') == true) {
                count++;
            }
        }
        if(count == this.collection.length) {
            this.model.set({
                chooseAll: 'checked'
            });
        } else {
            this.model.set({
                chooseAll: ''
            });
        }
    }
});


export default InputView;