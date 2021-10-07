import React, { useEffect, useState } from "react";
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
         {albums.map((album) => (<AlbumDetail key={album.id} {...album} />))}
      </div>
   );
}

export default App;