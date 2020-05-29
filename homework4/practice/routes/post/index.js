var express = require('express');
var router = express.Router();
let Post = require('../../models/post');
let util = require('../../modules/util');
let statusCode = require('../../modules/statusCode');
let resMessage = require('../../modules/responseMessage');

//read all post
router.get('/', async (req, res) => {
    const result = await Post.getAllPost();
    console.log(result);
    res.status(200).send(util.success(statusCode.OK, resMessage.READ_ALL_POST_SUCCESS,{Post : result}));
});

//read one post
router.get('/:id', async(req, res)=>{
    const postId = req.params.id;
    const result = await Post.getPostById(postId);

    if (result === false) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_USER));
    } 
    else {
        console.log(result);
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, {postId: postId, title: result[0].title, author: result[0].author, content: result[0].content}));
    }

})

//create post
router.post('/',async(req,res)=>{
    const {id, title, author, content} = req.body;

    if (!id || !title || !author|| !content){
        return res.status(400).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
    }

    //post 중에 중복되는 아이디가 있는지 확인
    const alreadyExist = await Post.checkPost(id);
    if(alreadyExist){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.ALREADY_POST_ID));
        return;
    }

    const idx = await Post.InsertPost(id, title, author, content);
    if (idx === -1) {
        return res.status(statusCode.DB_ERROR)
            .send(util.fail(statusCode.DB_ERROR, resMessage.DB_ERROR));
    }
    res.status(statusCode.OK)
        .send(util.success(statusCode.OK, resMessage.CREATE_POST_SUCCESS, {postId: idx}));

})

//update post
router.put('/:id', async(req,res)=>{
    const {id, title, author, content} = req.body;

    const alreadyExist = await Post.checkPost(id);
    if(!alreadyExist){
        res.status(statusCode.BAD_REQUEST)
            .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
        return;
    }

    try {
        await Post.updatePost(id, title, author,content);
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.UPDATE_POST_SUCCESS,{postid: id}))
    }catch{
        res.status(400).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_POST));
    }
})

//delete post
router.delete('/:id', async(req,res)=>{
    const postId = req.params.id;

    if (Post.deletePost(postId)){
        return res.status(statusCode.OK)
            .send(util.success(statusCode.OK, resMessage.DELETE_POST_SUCCESS, {postId : postId}));
    }
    
    console.log(Post);
    res.status(400).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_POST));

})

module.exports = router;