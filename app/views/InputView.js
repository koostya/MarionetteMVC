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
        $(this.el).html(this.template(template));
        if(this.collection.length >= 1) {
            this.$('.choose_all').show();
        } else {
            this.$('.choose_all').hide();
        }

        this.model.save();

        this.checkIsAllItemsCompleted();
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
        if(this.$('#choose_all')[0].checked) {
            completed = true;
            checked = 'checked';
        } else {
            completed = false;
            checked = '';
        }
        for(let i = 0; i < this.collection.models.length; i++) {
            this.collection.models[i].set({
                completed: completed,
                checked: checked
            });
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
            this.$('#choose_all')[0].checked = true;
        } else {
            this.$('#choose_all')[0].checked = false;
        }
    }
});


export default InputView;