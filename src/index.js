import $ from 'jquery';

import './index.css';

import api from './api';
import store from './store';
import bookmark from './bookmark';



//upon start
//get values from api
//store locally
//render

//get form values
//api call
//same vales local object
//render

function main(){
    //get items from api
    api.getItems()
        .then((items)=>{
            items.forEach((item)=>{
                item.edit = false;
                item.expanded = false;
                store.addToStore(item);
            });
            bookmark.render();
        });
    //for each of those items, add it to the local store
    //render

    //look at event listeners
    bookmark.eventHandler();
    //render
    bookmark.render();
}

$(main);