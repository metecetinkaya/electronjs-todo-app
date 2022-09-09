const { app, BrowserWindow, ipcMain } = require('electron');
const axios = require('axios');
const port = 3002;
const path = `http://localhost:${ port }/items`;

function connectMongoose() {
    const mongoose = require('mongoose');
    const mongodb_uri = 'mongodb+srv://metehancetinkaya:test123@todoservercluster.sfjgqcf.mongodb.net/?retryWrites=true&w=majority';

    mongoose
        .connect(mongodb_uri).then(() => console.log('Connected to database '))
        .catch(err => console.error(`Error connecting to the database. \n${err}`));
}

function createServer() {
    const expressServer = require('./server');
    const http = require('http');
    const server = http.createServer(expressServer);

    server.listen(port);
    console.debug(`Server listening on port ${ port }`);
};

function createWindow() {
    const window = new BrowserWindow({
        width: 700,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        autoHideMenuBar: true,
    });

    //window.webContents.openDevTools();
    window.loadFile('./frontend/index.html');

    ipcMain.on('items_get', async (event, payload) => {
        axios.get(path, payload).then(response => {
            if (response.data.status === 200) {
                event.reply('items_get', response.data.items);
            } else {
                console.error(response.data.status);
            }
        });
    });

    ipcMain.on('item_create', async (event, payload) => {
        axios.post(path, payload).then(response => {
            if (response.data.status === 200) {
                event.reply('item_created', response.data.items);
            } else {
                console.error(response.data.status);
            }
        });
    });

    ipcMain.on('item_update', async (event, payload) => {
        axios.put(path, payload).then(response => {
            if (response.data.status === 200) {
                event.reply('item_updated', response.data.items);
            } else {
                console.error(response.data.status);
            }
        });
    });

    ipcMain.on('item_delete', async (event, payload) => {
        axios.delete(path, payload).then(response => {
            console.debug(response.data)
            if (response.data.status === 200) {
                event.reply('item_deleted', response.data.items);
            } else {
                console.error(response.data.status);
            }
        });
    });
};

app.whenReady().then(() => {
    connectMongoose()
    createServer();
    createWindow();
  
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    })
})
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})