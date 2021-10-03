import React, { useState } from "react";
import "./App.css";
import PostCreate from "./PostCreate";
import PostList from "./PostList";

function App() {

  const initialFormState = {
    id: "",
    type: "Text",
    content: ""
  }

  const [formData, setFormData] = useState( { ...initialFormState } )

  const [type, setType] = useState("Text")

  const [posts, setPosts] = useState([]);

  return (

    <div className="App">

      <PostCreate 
      initialFormState={initialFormState} 
      formData={formData} 
      setFormData={setFormData}
      type={type} 
      setType={setType}
      posts={posts}
      setPosts={setPosts}
      />

      <PostList 
      type={type}
      posts={posts} 
      setPosts={setPosts}/>

    </div>

  );
}

export default App;