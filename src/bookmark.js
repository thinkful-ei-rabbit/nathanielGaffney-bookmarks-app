import $ from 'jquery';

import store from './store';

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

function filterButton(){
    $('.header').on('click', '.filter-start', () => {
        store.states.filter = !store.states.filter;
        render();
    });
}

function filterSelect(){
    $('main').on('change', '#filter', (e) =>{
        console.log();
        store.states.filterVal = $('option:selected').val();
        console.log(store.states.filterVal);
        //$('filter-option').prop('selected', false);
        //$(e.currentTarget).prop('selected', true);
    });
}



//////////////

// SUBMIT EDIT

//MAYBE TRY API????????

//////////////


function eventHandler() {
    itemButton();
    editButton();
    filterButton();
    filterSelect();
}

function generateItemHtml(item) {
    if (item.edit) {
        return `<section class="bookmark-item" data-item-id='${item.id}'>
        <section class="bookmark-edit">
        <section class="edit-title">
            <label for="edit-title-input">Title</label>
            <input type="text" id="edit-title-input" placeholder="input title">
            <label for="rate-edit">Rating:</label>
            <select name="rate-edit" id="rate-edit">
                <option class='filter-0' value="0">0 Stars</option>
                <option class='filter-option' value="1">1 Star</option>
                <option class='filter-option' value="2">2 Stars</option>
                <option class='filter-option' value="3">3 Stars</option>
                <option class='filter-option' value="4">4 Stars</option>
                <option class='filter-option' value="5">5 Stars</option>
            </select>
        </section>
        <section class="edit-dropdown">
            <div class="edit-description">
                <label for="edit-dropdown-description">Description:</label>
                <textarea id="edit-dropdown-description" placeholder="input description"></textarea>
            </div>
            <div class="edit-url">
                <label for="edit-dropdown-url">Visit Site:</label>
                <input type="text" id="edit-dropdown-url" placeholder="input url">
            </div>
            <div class="edit-control">
                <button>Save Bookmark</button>
                <button>Remove Bookmark</button>
            </div>
        </section>
    </section>
    </section>`
    } else if (item.expanded) {
        return `<section class="bookmark-item" data-item-id='${item.id}'>
    <section class="bookmark-title">
        <h2>${item.title}</h2>
        <h3>Rating: ${item.rating} out of 5</h3>
    </section>


    <section class="bookmark-dropdown">
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
    </section>

</section>`;
    } else {
        return `<section class="bookmark-item" data-item-id='${item.id}'>
    <section class="bookmark-title">
        <h2>${item.title}</h2>
        <h3>Rating: ${item.rating} out of 5</h3>
    </section>`
    }
}

function generateFilterHtml() {
    if (store.states.filter){
        let filterArr = [];
        for (let i = 0; i < 6; i++){
            if (i == store.states.filterVal){
                filterArr.push(`<option class='filter-option' value="${i}" selected>${i}</option>`);
            } else {
                filterArr.push(`<option class='filter-option' value="${i}">${i}</option>`);
            }
        }
        let optionStr = filterArr.join('');

        return `<section class="bookmark-filter">
    <label for="filter">Filter Bookmarks: Minimum Rating</label>
    <select name="filter" id="filter" value="3">
        ${optionStr}
       </select>
      </section>`;
    } 
}


function render() {
    let items = store.items;
    // apply filter to 'items' and remove the ones that dont pass through
    // create html for each item and string them together
    const htmlArray = items.map((item) => generateItemHtml(item));
    let htmlRender = htmlArray.join('');
    //insert html into dom at correct location
    $('.filter-controls').empty();
    $('.filter-controls').append(generateFilterHtml())
    $('.bookmark-main').empty();
    $('.bookmark-main').append(htmlRender);
    console.log(store.states.filterVal);
}



export default {
    render,
    eventHandler
}