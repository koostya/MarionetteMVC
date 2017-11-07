import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

import LayoutView from './views/LayoutView';
import ItemModel from './models/Item';
import ItemsCollection from './collections/ItemsCollection';

const initialData = [
    {text: 'Here some text!', completed: false},
    {text: 'Here some text to!', completed: false}
];

const app = new Marionette.Application({
    onStart: function(options) {
        var layout = new LayoutView({
            collection: new ItemsCollection(initialData),
            model: new ItemModel()
        });
        layout.render();
        layout.triggerMethod('show');
    }
});

app.start({initialData: initialData});

