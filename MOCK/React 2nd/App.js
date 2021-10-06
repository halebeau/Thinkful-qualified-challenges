import React, { useEffect, useState } from "react";
import UserTodos from "./UserTodos.js";

function App() {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/users")
         .then((response) => response.json())
         .then(setUsers)
         .catch((error) => {
         console.log(error);
         });
   }, []);

   return (
      <div className="App">
         <h1>Users</h1>
         <section className="users-list">
         {users.map((user) => (
            <div key={user.id}>
               <UserTodos user={user} />
            </div>
         ))}
         </section>
      </div>
   );
}

export default App;
