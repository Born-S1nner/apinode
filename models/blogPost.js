const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: Date,
        default: Date.now()
    }
});

const BlogPost = mongoose.model('cookies', BlogPostSchema);

module.exports = BlogPost;