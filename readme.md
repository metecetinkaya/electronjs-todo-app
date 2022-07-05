//POST
localhost:3001/items
{
    "title": "new"
}


// PUT
localhost:3001/items/1
{
    "title": "update test",
    "order": 1,
    "completed": true
}

// DELETE
localhost:3001/items/3