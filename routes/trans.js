const express = require('express');
const dbService = require('../core/transaction');
const router = express.Router();

// create
router.post('/insert', (request, response) => {
    const { id, amount, location } = request.body;
    console.log(request.body)
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertNewName(id,amount,location);
    //console.log(result);
    result
    .then(data => response.send({ data }))
    .catch(err => console.log(err));
});

/// read
router.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

module.exports = router