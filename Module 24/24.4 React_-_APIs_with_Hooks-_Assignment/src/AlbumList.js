import React, { useEffect, useState } from "react";

function AlbumList({ allData, setAllData }) {
  const { users, currentUser, albums } = allData;
  useEffect(() => {
    const aborter = new AbortController();
    const loadAlbums = async () => {
      if (users.length) {
        try {
          const response = await fetch(
            `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`,
            { signal: aborter.signal }
          );
          const userAlbums = await response.json();
          setAllData({ ...allData, albums: userAlbums });
        } catch (error) {
          if (error.name === "AbortError") {
            console.log("Aborted");
          } else {
            throw error;
          }
        }
      }
    };
    loadAlbums();
    return () => aborter.abort();
  }, [currentUser]);


  if (!albums.length) {
    return <p>Please click on a user name to the left</p>;
  } else {
    console.log(albums);
    return (
      <div>
        <h2>{currentUser.name} Albums</h2>
        <ul>
          {albums.map((album) => (
            <li>
              {album.id} - {album.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AlbumList;