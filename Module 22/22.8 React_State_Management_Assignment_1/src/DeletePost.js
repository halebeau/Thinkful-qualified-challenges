import React from "react";

function DeletePost ( { post, posts, setPosts } ) {

    const deletePost = (indexToDelete) => {
        setPosts(posts.filter(post => post.id !== indexToDelete))
   }

   return <button name="delete" onClick={() => deletePost(post.id)} style={{marginTop: "auto"}}>
            Delete
        </button>

}

export default DeletePost