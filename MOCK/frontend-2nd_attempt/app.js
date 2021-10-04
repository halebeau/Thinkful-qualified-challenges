import React, { useEffect, useState } from "react";
import AlbumDetail from "./AlbumDetail";

function App() {
const [albums, setAlbums] = useState([]);
const [clicker, setClicker] = useState(false);
const [id, setId] = useState(0);

useEffect(() => {
   fetch("https://jsonplaceholder.typicode.com/albums?userId=1")
      .then((response) => response.json())
      .then(setAlbums)
      .catch((error) => {
      console.log(error);
      });
}, []);

function handleClick(albumId) {
   if (id === albumId && clicker) {
      setClicker(false);
   } else {
      setClicker(true);
      setId(albumId);
   }
}
const mapped = albums.map((album, index) => {
   return (
      <div key={index}>
      <button onClick={() => handleClick(album.id)}>{album.title}</button>
      {clicker ? <AlbumDetail album={album} id={id} /> : <p></p>}
      </div>
   );
});

return <div className="App">{mapped}</div>;
}

export default App;
