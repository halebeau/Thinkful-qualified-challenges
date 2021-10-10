-- TRUNCATE all tables to ensure that there are no
-- data in them so we start with a fresh set of data
truncate 
  artists, 
  songs
restart identity;

-- insert entries into the artists table
insert into artists
  (artist_name, genre_name)
values
  ('Jane', 'R&B'),
  ('Wright', 'Classical'),
  ('Jim', 'Rock'),
  ('Toby', 'Rock'),
  ('Meredith', 'Electronic'),
  ('Tom', 'Hip Hop'),
  ('Bently', 'Jazz'),
  ('Winnie', 'Hip Hop'),
  ('Ruda', 'Reggae');

insert into songs
  (song_name, album_name, artist)
values
  ('The Octagon', 'Now or Never', 9),
  ('God Bless the Renegades', 'Dead & Gone', 9),
  ('The Unraveling', 'Dream Wish', 2),
  ('Hurry Up and Wait', 'Cell-0', 2),
  ('The Dangerous Age', 'Making a New World', 5),
  ('Dreaming of David', 'Seeking Thrills', 4),
  ('Never Dies', 'You a Winner, Baby', 3),
  ('Bury the Moon', 'There Is No Year', 2),
  ('Memphis Magnetic', 'Dear Happy', 6),
  ('Sahran', 'Heavy Love', 7),
  ('Suddenly', 'Marigold', 7),
  ('Suga', 'Easy Money Baby', 9),
  ('Beach Bunny', 'Honeymoon', 7),
  ('Hollywood Undead', 'Weather', 2),
  ('New Hope Club', 'Baby', 3),
  ('Hello Robinson', 'Watching You', 2);
