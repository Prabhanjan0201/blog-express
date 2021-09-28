const {Post,validatePost} = require("../model/posts-model");
const mongoose = require('mongoose')
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');


router.get('/',async (req,res)=>{
    const posts = await Post.find();
    res.send(posts)
});

router.get('/:id',async (req,res)=>{
    const posts = await Post.findById();
    res.send(posts)
});

router.post('/',auth, async (req,res)=>{          // auth
    const result = validatePost(req.body);

    if (result.error){ 
        res.status(400).send(result.error.details[0].message);
    }

    let post = new Post({
        title:req.body.title,
        content:req.body.content,
        author:req.body.author,
        imageURL:req.body.imageURL,
        date:req.body.date
    });
    post = await post.save();
    res.send(post);
});

router.put('/:id',[auth,admin],async (req,res)=>{       //,[auth,admin]
    const post = await Post.findByIdAndUpdate(
        req.params.id,
        { title:req.body.title,
          content:req.body.content,
          author:req.body.author,
          imageURL:req.body.imageURL,
          date:req.body.date
        },
        { new: true }
      );
    
      if (!post)
        res.status(404).send("Post not found");
    
      const result = validatePost(req.body);
      if (result.error) {
        res.status(400).send(result.error.details[0].message);
      }
    
      res.send(post); 
});

router.delete("/:id",[auth,admin],async (req, res) => {      //,[auth,admin]
    const post = await Post.findByIdAndRemove(req.params.id);
  
    if (!post)
      res.status(404).send("Post not found");
  
    res.send(post);
  });




module.exports = router;
