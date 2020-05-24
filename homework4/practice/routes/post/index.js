var express = require('express');
var router = express.Router();
let Post = require('../../models/post');
let util = require('../../modules/util');
let statusCode = require('../../modules/statusCode');
let resMessage = require('../../modules/responseMessage');

router.get('/', async (req, res) => {
    res.status(200).send(util.success(statusCode.OK, resMessage.READ_ALL_POST_SUCCESS,{Post}));
});

router.get('/:id', async(req, res)=>{
    const postId = req.params.id;

    let post = Post.filter(post => post.id == postId);

    //해당 postId가 없는 경우
    if (post.length ==0){
        return res.status(400).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_POST));
    }

    res.status(200).send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS,{post}));
})

router.post('/',async(req,res)=>{
    const {id, title, author, content} = req.body;

    if (!id || !title || !author|| !content){
        return res.status(400).send(util.fail(statusCode.BAD_REQUEST,resMessage.NULL_VALUE));
    }

    if (Post.filter(post => post.id == id).length > 0){
        return res.status(400).send(util.fail(statusCode.BAD_REQUEST,resMessage.ALREADY_POST_ID));
    }

    Post.push({id, title, author,content});

    res.status(200).send(util.success(statusCode.OK, resMessage.CREATE_POST_SUCCESS,{postId: id}));

})

router.put('/:id', async(req,res)=>{
    const postId = req.params.id;
    const modifiedPost = req.body;

    for (var idx in Post){
        if (Post[idx].id === postId){
            Post[idx] = modifiedPost;
            return res.status(200).send(util.success(statusCode.OK,resMessage.UPDATE_POST_SUCCESS,{Post}));
        }
    };
    
    return res.status(400).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_POST));

})

router.delete('/:id', async(req,res)=>{
    const postId = req.params.id;

    for (var idx in Post){
        if (Post[idx].id === postId){
            Post.splice(idx,1);
            return res.status(200).send(util.success(statusCode.OK,resMessage.DELETE_POST_SUCCESS,{Post}));
        }
    };
    
    return res.status(400).send(util.fail(statusCode.BAD_REQUEST,resMessage.NO_POST));

})

module.exports = router;