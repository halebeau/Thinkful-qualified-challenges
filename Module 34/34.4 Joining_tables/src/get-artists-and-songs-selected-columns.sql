SELECT 
  artist_id,
  artist_name,
  song_name
FROM 
  artists
  JOIN songs
  ON artists.artist_id = songs.artist