const db = require("../db/connection");

function create(post) {
  return db("posts")
    .insert(post, "*")
    .then((createdPost) => createdPost[0]);
}

function read(postId) {
  return db("posts").select("*").where({ post_id: postId }).first();
}

function update(updatedPost) {
  return db("posts")
    .select("*")
    .where({ post_id: updatedPost.post_id })
    .update(updatedPost, "*")
    .then((uPost) => uPost[0]);
}

function destroy(postId) {
  return db("posts").where({post_id: postId}).del();
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};