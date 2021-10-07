import React, { useState } from "react";

function AlbumDetail({ id, title }) {
   const [photos, setPhotos] = useState([]);
   
   const loadPhotos = () => {
         fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`)
         .then((response) => response.json())
         .then((photos) => setPhotos(photos.splice(0, 10)))
         .catch((error) => {
            console.log(error);
         });
      };

      return (
         <div>
         <h2 onClick={loadPhotos}>{title}</h2>
         <ol>
            {photos.map((photo) => (
               <li key={photo.id}>
               <h3>{photo.title}</h3>
               <img src={photo.thumbnailUrl} alt={photo.title} />
               </li>
            ))}
         </ol>
         </div>
      );
}
export default AlbumDetail;