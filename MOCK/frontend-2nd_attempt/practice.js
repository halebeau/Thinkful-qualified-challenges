import React, { UseState, useEffect } from 'react';

function ProfileEdit() {
   const [user, setUser] = useState({});

   function changeHandler(event) {
      setUser({ ...user, [event.target.name]: event.target.value 
      });
   }

   useEffect(() => {
      async function loadUsers() {
         const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1"
         );
         const userFromAPI = await response.json();
         setUser(userFromAPI);
      }
      loadUsers();
   }, []);

   if (user.id) {
      return (
         <form name="profileEdit">
            <div>
               <label htmlFor="username">User Name:</label>
               <input
                  id="username"
                  name="username"
                  type="text"
                  value={user.username}
               />
            </div>
            <div>
               <label htmlFor="email">Email:</label>
               <input id="email" name="email" type="email" value={user.email} />
            </div>
         </form>
      );
   } 
   return "Loading...";  
}

export default ProfileEdit;