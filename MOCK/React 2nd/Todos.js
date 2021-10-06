import React, { useEffect, useState } from "react";

function UserTodos(props) {
   const [userTodos, setUserTodos] = useState([]);
   const loadTodos = () => {
      fetch(`https://jsonplaceholder.typicode.com/users/${props.user.id}/todos`)
         .then((response) => response.json())
         .then((todos) => setUserTodos(todos))
         .catch((error) => {
         console.log(error);
         });
   };

   if (props.user.id) {
      return (
         <div>
         <h2 onClick={loadTodos}>{props.user.name}</h2>
         <ol className="UserTodos">
            {userTodos.map((todo) => (
               <li key={todo.id}>
               <h5>{todo.title}</h5>
               <p style={{ fontSize: "20px" }}>{todo.completed}</p>
               </li>
            ))}
         </ol>
         </div>
      );
   }
   return <p>No todos to display</p>;
}

export default UserTodos;
