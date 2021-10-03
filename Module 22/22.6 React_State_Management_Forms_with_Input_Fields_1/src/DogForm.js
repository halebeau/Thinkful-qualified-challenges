import React, { useState } from "react";


function DogForm() {
    const [name, setName] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log(name, breed, age)
        setName("")
        setBreed("")
        setAge("")
      }

return(
    <form onSubmit={handleSubmit}>
    <label htmlFor="name">
      Name:
        <input
            placeholder="What do we call the floof?"
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={event => setName(event.target.value)}
        />
    </label>
    <label htmlFor="breed">
        Breed:
        <input
            placeholder="What breed is doggo?"
            id="breed"
            type="text"
            name="breed"
            value={breed}
            onChange={event => setBreed(event.target.value)}
        />
    </label>
    <label htmlFor="age">
        Age:
        <input
            placeholder="How old is the critter?"
            id="age"
            type="text"
            name="age"
            value={age}
            onChange={event => setAge(event.target.value)}
        />
    </label>
    <div>
      <input type="submit" value="Submit" />
    </div>
  </form>
)
}



export default DogForm;