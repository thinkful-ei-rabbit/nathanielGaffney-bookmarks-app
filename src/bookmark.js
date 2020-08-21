


/* TO DO

change most sections to divs, only have sections on the outside most elements

add api functionality to everything


*/

import cuid from 'cuid';

import $ from 'jquery';

import store from './store';
import api from './api';

const getItemIdFromElement = function (item) {
    return $(item)
        .closest('.bookmark-item')
        .data('item-id');
};

function itemButton() {
    $('.bookmark-main').on('click', '.bookmark-title', event => {
        const id = getItemIdFromElement(event.currentTarget);
        const item = store.findById(id);
        store.findAndUpdate(id, { expanded: !item.expanded });
        render();
    });
}

function editButton() {
    $('.bookmark-main').on('click', '.dropdown-control-edit', event => {
        const id = getItemIdFromElement(event.currentTarget);
        const item = store.findById(id);
        store.findAndUpdate(id, { edit: !item.edit });
        render();
    });

}

function editSubmit(){
    $('.bookmark-main').on('click', '.edit-save', (event) => {
        const id = getItemIdFromElement(event.currentTarget);
        const item = store.findById(id);
        try{
            requireInput(item);
        } catch (x){
            return alert(x);
        }
        const editObj = {};
        editObj.title = $('#edit-title-input').val();
        editObj.rating = $('#rate-edit').val();
        editObj.desc = $('#edit-dropdown-description').val();
        editObj.url = $('#edit-dropdown-url').val();
        editObj.edit = !item.edit;
        try{
            api.updateItem(id, editObj);
        } catch (e){
            return alert(e);
        }
        store.findAndUpdate(id, editObj);
        render();
    });
    //when the edit is submitted, the information in the forms are put into
    //an api call, which patches an existing object at the server
    //the same values are used to update the existing local object
    //render
}

function editRemove(){
    $('.bookmark-main').on('click', '.edit-remove, .dropdown-control-remove', (event) => {
        const id = getItemIdFromElement(event.currentTarget);
        const item = store.findIndexById(id);
        api.removeItem(id);
        store.deleteAtIndex(item);
        render();
    });
}

function filterButton(){
    $('.header').on('click', '#filter-start', () => {
        store.states.filter = !store.states.filter;
        render();
    });
}

function filterSelect(){
    $('main').on('change', '#filter', () =>{
        store.states.filterVal = $('option:selected').val();
        render();
    });
}

function addButton(){
    $('.header').on('click', '#add-new', () => {
        store.states.add = !store.states.add;
        render();
    });
}

function addSubmit(){
    $('.new-controls').on('click', '.new-save', () => {
        try{
            requireInput(store.items);
        } catch (x){
            return alert(x);
        }
        const addObj = {};
        addObj.id = cuid();
        addObj.title = $('#new-title-input').val();
        addObj.rating = $('#rate-new').val();
        addObj.desc = $('#new-dropdown-description').val();
        addObj.url = $('#new-dropdown-url').val();
        addObj.edit = false;
        try{
            api.createItem(addObj);
        } catch (e){
            return alert(e);
        }
        store.addToStore(addObj);
        store.states.add = false;
        render();
    });
}

function cancelButton(){
    $('main').on('click', '.new-cancel', () => {
        store.states.add = !store.states.add;
        render();
    });
}

function requireInput(item){
    if (store.states.add){
            if ($('#new-title-input').val() === '') throw "Title input Required.";
            if ($('#rate-new').val() === '') throw "Rating Required.";
            if ($('#new-dropdown-description').val() === '') throw "Description Required.";
            if ($('#new-dropdown-url').val() === '') throw "URL Required."
    }
    if (item.edit){
        if ($('#edit-title-input').val() === '') throw "Title input Required.";
        if ($('#rate-edit').val() === '') throw "Rating Required.";
        if ($('#edit-dropdown-description').val() === '') throw "Description Required.";
        if ($('#edit-dropdown-url').val() === '') throw "URL Required."
}
}


function eventHandler() {
    itemButton();
    editButton();
    editSubmit();
    editRemove();
    filterButton();
    filterSelect();
    addButton();
    addSubmit();
    cancelButton();
}

function generateItemHtml(item) {
    if (item.edit) {
        let ratingArr = [];
        for (let i = 1; i < 6; i++){
            if (i == item.rating){
                ratingArr.push(`<option class='edit-option' value="${i}" selected>${i}</option>`);
            } else {
                ratingArr.push(`<option class='edit-option' value="${i}">${i}</option>`);
            }
        }
        let optionStr = ratingArr.join('');
        return `<div class="bookmark-item" data-item-id='${item.id}'>
        <div class="bookmark-edit">
        <div class="edit-title">
            <label class="edit-title-label" for="edit-title-input"><h2>Title</h2></label>
            <input type="text" id="edit-title-input" value="${item.title}">
            <label class="edit-rate-label" for="rate-edit"><h3>Rating:</h3></label>
            <select name="rate-edit" id="rate-edit">
                ${optionStr}
            </select>
        </div>
        <div class="edit-dropdown">
            <div class="edit-description">
                <label for="edit-dropdown-description">Description:</label>
                <textarea id="edit-dropdown-description" >${item.description}</textarea>
            </div>
            <div class="edit-url">
                <label for="edit-dropdown-url">Visit Site:</label>
                <input type="text" id="edit-dropdown-url" value="${item.url}">
            </div>
            <div class="edit-control">
                <button class="edit-save">Save Bookmark</button>
                <button class="edit-remove">Remove Bookmark</button>
            </div>
        </div>
    </div>
    </div>`
    } else if (item.expanded) {
        return `<section class="bookmark-item" data-item-id='${item.id}'>
    <div class="bookmark-title">
        <h2>${item.title}</h2>
        <h3>Rating: ${item.rating} out of 5</h3>
    </div>


    <div class="bookmark-dropdown">
        <div class="dropdown-description">
            <h3>Description</h3>
            <p>${item.description}</p>
        </div>
        <div class="dropdown-url">
            <h3>Visit Site:</h3>
            <a href="${item.url}" target="_blank">${item.url}</a>
        </div>
        <div class="dropdown-control">
            <button class="dropdown-control-edit">Edit Bookmark</button>
            <button class="dropdown-control-remove">Remove Bookmark</button>
        </div>
    </div>

</div>`;
    } else {
        return `<div class="bookmark-item" data-item-id='${item.id}'>
    <div class="bookmark-title">
        <h2>${item.title}</h2>
        <h3>Rating: ${item.rating} out of 5</h3>
    </div>
    </div>`
    }
}

function generateFilterHtml() {
    if (store.states.filter){
        let filterArr = [];
        for (let i = 1; i < 6; i++){
            if (i == store.states.filterVal){
                filterArr.push(`<option class='filter-option' value="${i}" selected>${i}</option>`);
            } else {
                filterArr.push(`<option class='filter-option' value="${i}">${i}</option>`);
            }
        }
        let optionStr = filterArr.join('');

        return `<div class="bookmark-filter">
    <label for="filter">Filter Bookmarks: Minimum Rating</label>
    <select name="filter" id="filter" value="3">
        ${optionStr}
       </select>
      </div>`;
    } 
}

function generateAddHtml(){
    if (store.states.add){
        return `<div class="bookmark-new">
        <div class="new-title">
            <label for="new-title-input"><h2>Title:</h2></label>
            <input type="text" id="new-title-input" placeholder="input title">
            <label for="rate-new"><h3>Rating:</h3></label>
            <select name="rate-new" id="rate-new">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
        </div>
        <div class="new-dropdown">
            <div class="new-description">
                <label for="new-dropdown-description">Description:</label>
                <textarea id="new-dropdown-description" placeholder="input description"></textarea>
            </div>
            <div class="new-url">
                <label for="new-dropdown-url">Visit Site:</label>
                <input type="text" id="new-dropdown-url" placeholder="input url">
            </div>
            <div class="new-control">
                <button class="new-save">Save Bookmark</button>
                <button class="new-cancel">Cancel</button>
            </div>
        </div>
    </div>`;
    }
}


function render() {
    let items = store.items.filter(item => {
        if(item.rating >= store.states.filterVal){
            return item;
        }});
    const htmlArray = items.map((item) => generateItemHtml(item));
    let htmlRender = htmlArray.join('');
    //insert html into dom at correct location

    $('.filter-controls').empty();
    $('.filter-controls').append(generateFilterHtml());
    $('.new-controls').empty();
    $('.new-controls').append(generateAddHtml());
    $('.bookmark-main').empty();
    $('.bookmark-main').append(htmlRender);
}



export default {
    render,
    eventHandler
}