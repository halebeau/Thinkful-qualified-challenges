SELECT
  a.artist_name,
  s.song_name,
  s.album_name
FROM
  artists a
  RIGHT JOIN
    songs s
    ON
      a.artist_id = s.artist