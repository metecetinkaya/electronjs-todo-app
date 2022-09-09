const { ipcRenderer } = require('electron');
const taskForm = document.querySelector('#form');
const taskList = document.querySelector('#list');
const taskName = document.querySelector('#title');
const taskDescription = document.querySelector('#description');

let updateStatus = false;
let updatedItemId = '';
let todos = [];

function deleteItem(id) {
    const response = confirm('Are you sure you want to deleteItem it?');

    if (response) {
        ipcRenderer.send('item_delete', {id});
    }

    return;
}

function editItem(id) {
    const editedItem = todos.find(item => item.id === id);

    updateStatus = true;
    updatedItemId = id;
    taskName.value = editedItem.title;
    taskDescription.value = editedItem.description;
}

function rendertodos(todos) {
    taskList.innerHTML = '';
    
    todos.map((task) => {
        taskList.innerHTML += 
            `<li class='card'>
                <div class="item-container">
                    <h3>${task.title}</h3>
                    <div>${task.description}</div>
                    <div class="create"><b>Create Time:</b> ${task.create}</div>
                </div>
                <div class="button-container">
                    <button class='btn btn-danger' onclick='deleteItem(${task.id})'>Delete</button>
                    <button class='btn btn-secondary' onclick='editItem(${task.id})'>Edit</button>
                </div>   
            </li>`;
    });
}

taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const task = {
        title: taskName.value,
        description: taskDescription.value,
    };

    if (!updateStatus) {
        ipcRenderer.send('item_create', task);
    } else {
        ipcRenderer.send('item_update', {...task, id: updatedItemId});
    }

    taskForm.reset();
});

ipcRenderer.send('items_get');

ipcRenderer.on('items_get', (event, payload) => {
    todos = payload;

    rendertodos(todos);
});

ipcRenderer.on('item_created', (event, payload) => {
    todos.push(payload);

    rendertodos(todos);

    alert('Todo Created Successfully');

    taskName.focus();
});

ipcRenderer.on('item_updated', (event, payload) => {
    updateStatus = false;

    todos = todos.map(item => {
        if (item.id === payload.id) {
            item = payload;
        }

        return item;
    });

    rendertodos(todos);
});

ipcRenderer.on('item_deleted', (event, payload) => {
    todos = todos.filter(item => item.id !== payload.id);

    rendertodos(todos);
});


