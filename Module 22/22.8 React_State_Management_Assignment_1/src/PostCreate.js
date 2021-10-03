import React from "react"

function PostCreate( { initialFormState, formData, setFormData, type, setType, posts } ) {

  const newPost = { 
    id: "",
    type: type,
    content: formData.content 
  }

  const handleChange = (event) => setFormData( {...formData, [event.target.name]: event.target.value} )

  const handleTypeChange = (event) => setType(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    posts.push(newPost)
    console.log(posts)
    setFormData( { ...initialFormState } )
  }

  return (
    <form name="create" id="create" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Create</legend>
        <div>
          <label htmlFor="type">Type: </label>
          <select 
          id="type" 
          name="type"
          onChange={handleTypeChange} 
          required={true}>
            <option value="Text">Text</option>
            <option value="Image">Image</option>
          </select>
        </div>
        <div>
          <label htmlFor="content">Content: </label>
          {type === "Text" ? (
            <textarea 
            id="content" 
            name="content" 
            value={formData.content} 
            onChange={handleChange}
            required={true} 
            rows={3} 
            />
          ) : (
            <input 
            id="content" 
            name="content" 
            type="url" 
            value={formData.content} 
            onChange={handleChange}
            required={true} 
            />
          ) }
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </fieldset>
    </form>
  )
}

export default PostCreate;