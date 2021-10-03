import React, { useState } from "react";

function RSVPForm() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [newMember, setNewMember] = useState(false);
    const [comment, setComment] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log(name, age, newMember, comment)
        setName("")
        setAge("")
        setNewMember(false)
        setComment("")
      }

    const handleCheckbox = () => {
        setNewMember(!newMember);
        }

return(
    <form onSubmit={handleSubmit}>
        <label htmlFor="name">
            Name:
                <input
                    placeholder="Whatcha call yourself?"
                    id="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={event => setName(event.target.value)}
                />
        </label>
        <label htmlFor="age">
            Age:
            <select
                id="age"
                name="age"
                onChange={event => setAge(event.target.value)}
                value={age}
                >
                <option value="">Prefer not to say</option>
                <option value="">0-19</option>
                <option value="">20-39</option>
                <option value="">40-59</option>
                <option value="">60+</option>
            </select>
        </label>
        <label htmlFor="NewMember">
            New Member?
            <input
                id="NewMember"
                type="checkbox"
                name="NewMember"
                onChange={handleCheckbox}
                checked={newMember}
                value="NewMember"
            />
        </label>
        <label htmlFor="comment">
            Comments:
            <input
                placeholder="Comments"
                id="comment"
                type="text"
                name="comment"
                value={comment}
                onChange={event => setComment(event.target.value)}
            />
        </label>
        <div>
      <input type="submit" value="Submit" />
    </div>
  </form>
    )
}

export default RSVPForm;