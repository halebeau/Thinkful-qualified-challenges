import React from "react";

export default function Comments({ comments, clicked }) {
   if (!clicked) {
      return null;
   }
   const commentList = comments.map((comment) => (
      <p key={comment.id}>{comment.body}</p>
   ));
   return <>{commentList}</>;
}
