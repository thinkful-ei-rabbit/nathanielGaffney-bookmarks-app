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

function findAndUpdate (id, newData) {
    const currentItem = this.findById(id);
    Object.assign(currentItem, newData);
};

function addToStore(item) {
    this.items.push(item);
}

const testObj = {
    id: 'a',
    title: 'Google',
    rating: 4,
    url: 'https://www.google.com',
    description: 'It is a search Engine.',
    expanded: false,
    edit: false
}

items.push(testObj);



export default {
    items,
    states,
    addToStore,
    findById,
    findAndUpdate
}