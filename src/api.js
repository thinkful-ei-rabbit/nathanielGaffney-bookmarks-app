const BASE_URL = 'https://thinkful-list-api.herokuapp.com/nate-bookmark';


function apiCheckFetch(...args) {
    let error;
    return fetch(...args)
        .then(res => {
            if (!res.ok) {
                error = { code: res.status };
                if (!res.headers.get('content-type').includes('json')) {
                    error.message = res.statusText;
                    return Promise.reject(error);
                }
            }
            return res.json();
        })
        .then(resJson => {
            if (error) {
                error.message = resJson.message;
                return Promise.reject(error);
            }
            return resJson;
        });
};


function getItems() {
    return apiCheckFetch(`${BASE_URL}/items`);
};


function createItem(name) {
    const newItem = JSON.stringify({ name });
    return apiCheckFetch(`${BASE_URL}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: newItem
    });
};


function updateItem(id, updateData) {
    const newData = JSON.stringify(updateData);
    return apiCheckFetch(`${BASE_URL}/items/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: newData
    });
};


function removeItem(id) {
    return apiCheckFetch(BASE_URL + '/items/' + id, {
        method: 'DELETE'
    });
};

export default {
    getItems,
    createItem,
    updateItem,
    removeItem
};