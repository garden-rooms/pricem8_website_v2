const fs = require('fs');

// Read the existing blog posts
const blogPosts = JSON.parse(fs.readFileSync('src/data/blogPosts.json', 'utf8'));

// Read the new blog post
let newPostContent = fs.readFileSync('new-blog-post.json', 'utf8').trim();
if (newPostContent.startsWith(',')) {
    newPostContent = newPostContent.substring(1).trim();
}
const newPost = JSON.parse(newPostContent);

// Insert the new post after the first one (index 1)
blogPosts.splice(1, 0, newPost);

// Write back
fs.writeFileSync('src/data/blogPosts.json', JSON.stringify(blogPosts, null, 4), 'utf8');

console.log("Blog post inserted successfully");
