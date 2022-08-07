const { ipcRenderer } = require('electron');

const taskForm = document.querySelector('#taskForm');
const taskName = document.querySelector('#taskName');
const taskDescription = document.querySelector('#taskDescription');
const taskList = document.querySelector('#taskList');

let updateStatus = false;
let idTaskToUpdate = '';

function deleteTask(id) {
    const response = confirm('are you sure you want to delete it?');

    if (response) {
        ipcRenderer.send('delete-task', id);
    }
    return;
}

function editTask(id) {
    updateStatus = true;
    idTaskToUpdate = id;
    const task = todos.find((task) => task._id === id);
    taskName.value = task.name;
    taskDescription.value = task.description;
}

function rendertodos(todos) {
    taskList.innerHTML = '';
    
    todos.map((task) => {
        taskList.innerHTML += 
            `<li class='card'>
                <h4>Task id: ${task._id}</h4>
                <p>Task Name: ${task.name}</p>
                <p>Task Description: ${task.description}</p>
                <button class='btn btn-danger' onclick='deleteTask('${task._id}')'>🗑 Delete</button>
                <button class='btn btn-secondary' onclick='editTask('${task._id}')'>✎ Edit</button>
            </li>`;
    });
}

let todos = [];

ipcRenderer.send('get-todos');

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const task = {
        name: taskName.value,
        description: taskDescription.value,
    };

    if (!updateStatus) {
        ipcRenderer.send('new-task', task);
    } else {
        ipcRenderer.send('update-task', {
            ...task,
            idTaskToUpdate
        });
    }

    taskForm.reset();
});

ipcRenderer.on('new-task-created', (e, arg) => {
    console.log(arg);
    const todosaved = JSON.parse(arg);
    todos.push(todosaved);
    console.log(todos);
    rendertodos(todos);
    alert('Task Created Successfully');
    taskName.focus();
});

ipcRenderer.on('get-todos', (e, args) => {
    const receivedtodos = JSON.parse(args);
    todos = receivedtodos;
    rendertodos(todos);
});

ipcRenderer.on('delete-task-success', (e, args) => {
    const deletedTask = JSON.parse(args);
    const newtodos = todos.filter((task) => {
        return task._id !== deletedTask._id;
    });
    todos = newtodos;
    rendertodos(todos);
});

ipcRenderer.on('update-task-success', (e, args) => {
    updateStatus = false;
    const updatedTask = JSON.parse(args);
    todos = todos.map((task, i) => {
        if (task._id === updatedTask._id) {
            task.name = updatedTask.name;
            task.description = updatedTask.description;
        }
        return task;
    });
    rendertodos(todos);
});