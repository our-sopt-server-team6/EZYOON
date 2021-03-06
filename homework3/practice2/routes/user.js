var express = require('express');
var router = express.Router();
let User = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');
const encrypt = require('../modules/encrypt');
const crypto = require('crypto');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// router.post('/signup', async (req, res) => {
//     const { id, name, password, email } = req.body;
//     User.push({id, name, password, email});
//     console.log(User);
//     res.status(200).send(User);
// });

// router.post('/signup', async (req, res) => {
//     const { id, name, password, email } = req.body;

//     //예외처리 파라미터 원소가 없는 경우
//     if ( !id || !name || !password || !email ) {
//         //return res.status(400).send({ message: 'BAD REQUEST' });
//         return res.status(400).send(util.fail(400,'BAD REQUEST'));
//     }
//     //예외처리 아이디
//     if (User.filter(user => user.id == id).length > 0) {
//         //return res.status(400).send({ message: 'ALREADY ID' });
//         return res.status(400).send(util.fail(400,'ALREADY ID'));
//     }

//     User.push({id, name, password, email});
//     //res.status(200).send(User);
//     res.status(200).send(util.success(200, '회원가입 성공', {userId: id}));
// });

// const util = {
//     success : (status, message, data)=>{
//         return {
//             status : status,
//             success : true,
//             message:message,
//             data: data
//         }
//     },
//     fail:(status,message)=>{
//         return{
//             status: status,
//             success:false,
//             message: message
//         }
//     },
// };

router.post('/signup', async (req, res) => {
    let { id, name, password, email } = req.body;

    //예외처리 파라미터 원소가 없는 경우
    if ( !id || !name || !password || !email ) {
        //return res.status(400).send({ message: 'BAD REQUEST' });
        return res.status(400).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
    }
    //예외처리 아이디
    if (User.filter(user => user.id == id).length > 0) {
        //return res.status(400).send({ message: 'ALREADY ID' });
        return res.status(400).send(util.fail(statusCode.BAD_REQUEST,resMessage.OUT_OF_VALUE));
    }

    const salt = crypto.randomBytes(32).toString('hex');
    password = await encrypt(salt, password);
    console.log(password);
    User.push({id, name, password, email, salt});
    res.status(200).send(User);
    //res.status(200).send(util.success(statusCode.OK, resMessage.CREATED_USER, {userId: id}));
});

//로그인
router.post('/signin', async(req,res)=>{
    let {id, password} = req.body;

    if (!id || !password) {
        return res.status(400).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }
    let culuser = User.filter(user => user.id == id);
    if (culuser.length == 0){
        return res.status(400).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }
    var hashed= await encrypt(culuser[0].salt, password);

    if (culuser[0].password != hashed){
        return res.status(400).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    }

    res.status(200).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userId: id}));
});

//프로필 조회
router.get('/profile/:id', async(req,res)=>{
    const id = req.params.id;
    let culuser = User.filter(user => user.id == id);
    
    if (culuser.length == 0){
        return res.status(400).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    }

    res.status(200).send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userId: id, name: culuser[0].name, email: culuser[0].email}));

})

module.exports = router;