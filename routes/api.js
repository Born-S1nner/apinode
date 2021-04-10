let router = require('express').Router();

let BlogPost = require('../models/blogPost')

router.get('/', (req, res) => {

    BlogPost.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((err) => {
            console.log('error: ', err);
        });
});

router.post('/save', async(req, res) => {
    const data = req.body;
    const newBlogPost = new BlogPost(data);

    try {
        const blogPost = await newBlogPost.save();
        res.json({
            msg: 'We saved your data in the DB.'
        });
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/:id', getBlog, (req, res) => {
    res.send(res.blogItem)
});

async function getBlog(req, res, next) {
    let blogItem
    try {
        blogItem = await BlogPost.findById(req.params.id)
        if (blogItem == null) {
            return res.status(404).json({ message: "Can't find the BlogItem" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.blogItem = blogItem
    next()
}

module.exports = router;
//use all the other tasks