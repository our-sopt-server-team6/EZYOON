var express = require('express');
var router = express.Router();
let User = require('../models/user');
let util = require('../modules/util');
let statusCode = require('../modules/statusCode');
let resMessage = require('../modules/responseMessage');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  console.log(User.checkUser(4));
  res.status(200).send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, {User}));

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

//회원가입
router.post('/signup', async (req, res) => {
    const { id, name, password, email } = req.body;

    //예외처리 파라미터 원소가 없는 경우
    if ( !id || !name || !password || !email ) {
        //return res.status(400).send({ message: 'BAD REQUEST' });
        return res.status(400).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
    }
    //예외처리 아이디
    // if (User.filter(user => user.id == id).length > 0) {
    //     //return res.status(400).send({ message: 'ALREADY ID' });
    //     return res.status(400).send(util.fail(statusCode.BAD_REQUEST,resMessage.OUT_OF_VALUE));
    // }

    // User.push({id, name, password, email});
    // //res.status(200).send(User);
    // res.status(200).send(util.success(statusCode.OK, resMessage.CREATED_USER, {userId: id}));

    //사용자 중에 중복되는 아이디가 있는지 확인
    const alreadyExist = await User.checkUser(id);
    if(alreadyExist){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_USER_ID));
        return;
    }

    const salt = 'dfw23EFVR3fefnd68FW3r4343';
    // User.push({id, name, password, email});
    const idx = await User.signup(id, name, password, salt, email);
    if (idx === -1) {
        return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATED_USER, {userId: idx}));
});

//로그인
router.post('/signin', async(req,res)=>{
    const {id, password} = req.body;

    if (!id || !password) {
        return res.status(400).send(util.fail(statusCode.BAD_REQUEST, resMessage.NULL_VALUE));
    }
    // //사용자 찾기
    // let culuser = User.filter(user => user.id == id);
    // if (culuser.length == 0){
    //     return res.status(400).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    // }
    // //패스워드가 맞는지 확인
    // if (culuser[0].password != password){
    //     return res.status(400).send(util.fail(statusCode.BAD_REQUEST, resMessage.MISS_MATCH_PW));
    // }
    
    if (User.signin(id, password)){
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.LOGIN_SUCCESS, {userId: id}));
    }

});

//프로필 조회
router.get('/profile/:id', async(req,res)=>{
    const id = req.params.id;
    
    // let culuser = User.filter(user => user.id == id);
    // if (culuser.length == 0){
    //     return res.status(400).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    // }
    // res.status(200).send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, {userId: id, name: culuser[0].name, email: culuser[0].email}));
    const result = await User.getUserById(id);
    
    if (result === false) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    } 
    else {
        console.log(result);
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_PROFILE_SUCCESS, {userId: id, name: result[0].name, email: result[0].email}));
    }
})

module.exports = router;