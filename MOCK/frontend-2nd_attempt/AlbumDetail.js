import React, { useState, useEffect } from "react";

export default function AlbumDetail({ album, id }) {
   const [photos, setPhotos] = useState([]);
   useEffect(() => {
      fetch(`https://jsonplaceholder.typicode.com/albums/${album.id}/photos`)
         .then((response) => response.json())
         .then(setPhotos)
         .catch((error) => {
         console.log(error);
         });
   }, []);

   const photoMap = photos.map((photo, index) => {
      return (
         <div key={index}>
         {id === album.id ?
            <div>
               <p>{photo.title}</p>
               <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
         : <p></p>}
         </div>
      );
   });

   return <p>{photoMap.slice(0, 10)}</p>;
}
