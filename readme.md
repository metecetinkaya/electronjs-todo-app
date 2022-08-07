//POST
localhost:3001/items
{
    "title": "new"
}


// PUT
localhost:3001/items/
{ 
    "filter": {
        "name": "mete"
    },
    "update": {
        "name": "mete_update",
        "description": "mete_test_update"
    } 
}

// DELETE
localhost:3001/items/3
