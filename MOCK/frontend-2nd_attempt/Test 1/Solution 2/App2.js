import React, { useEffect, useState } from "react";
// import "./App.css";
import AlbumDetail from "./AlbumDetail";

function App() {
   const [albums, setAlbums] = useState([]);

   useEffect(() => {
      fetch("https://jsonplaceholder.typicode.com/albums?userId=1")
         .then((response) => response.json())
         .then(setAlbums)
         .catch((error) => {
         console.log(error);
         });
   }, []);

   return (
      <div className="App">
         <h1>User Albums </h1>
         <section className="album-list">
         {albums.map((album) => (
            <div key={album.id}>
               <AlbumDetail {...album} />
            </div>
         ))}
         </section>
      </div>
   );
}

export default App;
