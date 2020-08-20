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

function getItems(){
    //call api and get all items stored at server
    //let items = //result of api call
    //items.forEach(item => store.addToStore(item));
    
    //render
}


function filterSubmit(){
    //when you click the rating from the list, the value in the
    //input is used as a condition to display only bookmarks with a rating value
    //that is >= the input
    //items not passing the check are hidden
    //render
}

function addButton(){
    //when you click add button, the new section displays or hides based on current state
}

function addSubmit(){
    //when 'save bookmark' is clicked, an api call takes the input of the form
    //and stores an object to the server
    //if no error, then the same values are used to create a local object

    //edit box for each item must reflect the items current values as placeholder text

    //render
}

function editSubmit(){
    //when the edit is submitted, the information in the forms are put into
    //an api call, which patches an existing object at the server
    //the same values are used to update the existing local object
    //render
}

function main(){
    //get items from api
    //for each of those items, add it to the local store
    //render

    //look at event listeners
    bookmark.eventHandler();
    //render
    bookmark.render();
}

$(main);