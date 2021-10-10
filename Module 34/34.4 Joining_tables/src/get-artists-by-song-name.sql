SELECT
  artist_name,
  song_name,
  album_name  
FROM 
  artists
  INNER JOIN songs
  ON artists.artist_id = songs.artist
WHERE songs.song_name LIKE 'The%'
