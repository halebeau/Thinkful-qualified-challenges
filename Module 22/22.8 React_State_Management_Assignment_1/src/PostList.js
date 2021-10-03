import React from "react"
import PostContent from "./PostContent"

function PostList( { posts, setPosts } ) {

  const postList = posts.map( (post, index) => {

    post.id = `${index}`

    return <PostContent 
    type={post.type} 
    post={post} 
    posts={posts} 
    setPosts={setPosts}
    key={index} 
    /> 

  })

  return <div className="post-list">{postList}</div>

}

export default PostList