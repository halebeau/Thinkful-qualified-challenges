import React from "react";
import DeletePost from "./DeletePost"

function PostContent ( { type, post, posts, setPosts } ) {

    return (
        <fieldset className="post">
            <div className="postContent" style={{marginTop: 20}}>
                {type === "Text" ? post.content : ( <img type={type} src={post.content} alt=""/> ) }
            </div>
            <br/>
            <div className="postButtons">
                <DeletePost post={post} posts={posts} setPosts={setPosts} />
            </div>
        </fieldset>
    )

}

export default PostContent