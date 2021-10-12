const db = require("../db/connection");

function list() {
  return db("comments").select("*");
}

function listCommenterCount() {
  return db("comments as c")
    .join("users as u", "u.user_id", "c.commenter_id")
    .select("u.user_email as commenter_email")
    .count("c.comment_id")
    .groupBy("commenter_email")
    .orderBy("commenter_email");
}

function read(commentId) {
  return db("comments as c")
    .where({ comment_id: commentId })
    .join("users as u", "u.user_id", "c.commenter_id")
    .join("posts as p", "p.post_id", "c.post_id")
    .select(
      "c.comment_id",
      "c.comment",
      "p.post_body as commented_post",
      "u.user_email as commenter_email"
    )
    .then((readItem) => readItem[0]);
}

module.exports = {
  list,
  listCommenterCount,
  read,
};