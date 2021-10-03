import React, { useState } from "react";
import Comments from "./Comments";

export default function PostDetail({ post }) {
   const [comments, setComments] = useState([]);
   const [clicked, setClicked] = useState(false);

   function commentHandler() {
      if (clicked) {
         setClicked(!clicked);
         return;
      }
      async function loadComments() {
         const response = await fetch(
         `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`
         );
         const comments = await response.json();
         console.log(comments);
         setComments(comments);
         setClicked(!clicked);
      }
      loadComments();
   }
   return (
      <>
         <h1>{post.title}</h1>
         <p onClick={commentHandler}>{post.body}</p>
         <Comments comments={comments} clicked={clicked} />
      </>
   );
}
