create table artists_concerts
(
  artist_id integer references artists(artist_id),
  concert_id integer references concerts(concert_id),
  scheduled_start_at time,
  scheduled_end_at time,
  primary key (artist_id, concert_id)
);