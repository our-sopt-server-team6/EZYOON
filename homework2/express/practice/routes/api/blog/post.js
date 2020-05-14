var express = require('express');
var router = express.Router();

router.get('/', (req,res) =>{
    const result ={
        status : 200,
        message : 'api/blog/post입니다.'
    }
    res.status(200).send(result);
})

module.exports = router;