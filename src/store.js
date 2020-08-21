/*
Objects in store.items should look like this

const testObj = {
    id: 'a',
    title: 'Google',
    rating: 4,
    url: 'https://www.google.com',
    description: 'It is a search Engine.',
    expanded: false,
    edit: false
}

*/


const items = [];
const states = {
    add: false,
    filter: false,
    filterVal: 0,
    error: null
}


function  findById (id) {
    return this.items.find(currentItem => currentItem.id === id);
};

function findIndexById (id){
    return this.items.findIndex(currentItem => currentItem.id === id);
}

function findAndUpdate (id, newData) {
    const currentItem = this.findById(id);
    Object.assign(currentItem, newData);
};

function deleteAtIndex(index){
    this.items.splice(index, 1);
}

function addToStore(item) {
    this.items.push(item);
}



export default {
    items,
    states,
    addToStore,
    findById,
    findAndUpdate,
    findIndexById,
    deleteAtIndex
}