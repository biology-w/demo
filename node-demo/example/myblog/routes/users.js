const express = require('express');
const router = express.Router();

router.get('/:name', (req, res) => {
    // res.send('hello, ' + req.params.name);
    res.render('users', {
        name: req.params.name,
        testArray: ['one', 'two', 'three']
    });
});

module.exports = router;
