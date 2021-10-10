-- TRUNCATE all tables to ensure that there are no
-- data in them so we start with a fresh set of data
truncate 
  artists, 
  songs,
  concerts,
  artists_concerts
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

-- insert entries into the concerts table
insert into concerts
  (concert_name, concert_date)
values
  ('Friday Night Fuzz Box', '01/20/2020'),
  ('Popular Music Concert', '11/20/2020'),
  ('ACL Fest 2020', '02/01/2020'),
  ('North by Northeast', '03/04/2020'),
  ('Chicago Honky Tonk', '01/20/2021'),
  ('Jukebox', '07/18/2020'),
  ('Remedy', '08/14/2020'),
  ('Sound of Music', '12/06/2020');

-- insert entries into the artists_concerts table
insert into artists_concerts
  (artist_id, concert_id, scheduled_start_at, scheduled_end_at)
values
  (1, 2, '09:00', '10:00'),
  (2, 2, '10:00', '11:00'),
  (1, 3, '19:00', '20:00'),
  (4, 5, '20:00', '22:00'),
  (2, 7, '19:00', '20:00'),
  (3, 8, '17:00', '19:00'),
  (5, 3, '20:00', '21:00'),
  (1, 1, '18:00', '20:00'),
  (6, 6, '20:00', '22:00'),
  (7, 7, '20:00', '21:00');

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
