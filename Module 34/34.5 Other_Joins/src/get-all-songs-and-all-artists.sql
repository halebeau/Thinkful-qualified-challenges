SELECT 
  a.artist_name as artist,
  s.song_name,
  s.album_name as album
FROM
  artists a
  FULL JOIN
    songs s
    ON 
      a.artist_id = s.artist