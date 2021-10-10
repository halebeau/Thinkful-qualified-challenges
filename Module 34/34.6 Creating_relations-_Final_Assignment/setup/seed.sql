truncate 
  books,
  authors,
  genres,
  books_genres
restart identity;

insert into authors
  (author_name, nationality)
values
  ('Ba Jin', 'China'),
  ('Jane Austen', 'United Kingdom'),
  ('Toni Morrison', 'United States of America'),
  ('Gabriel García Márquez', 'Colombia'),
  ('Elif Shafak', 'Turkey'),
  ('Amy Tan', 'United States of America'),
  ('Leo Tolstoy', 'Russia');

-- Ba Jin
insert into books
  (title, publication_year, author_id, in_stock)
values
  ('Destruction', 1929, 1, TRUE);

-- Jane Austen
insert into books
  (title, publication_year, author_id, in_stock)
values
  ('Sense and Sensibility', 1811, 2, TRUE),
  ('Pride and Prejudice', 1813, 2, TRUE),
  ('Mansfield Park ', 1814, 2, FALSE),
  ('Emma', 1815, 2, FALSE),
  ('Northanger Abbey', 1818, 2, TRUE),
  ('Persuasion', 1818, 2, FALSE),
  ('The Watsons', 1804, 2, TRUE),
  ('Sanditon', 1817, 2, TRUE);

-- Toni Morrison
insert into books
  (title, publication_year, author_id, in_stock)
values
  ('The Bluest Eye', 1970, 3, TRUE),
  ('Sula', 1973, 3, FALSE),
  ('Song of Solomon', 1977, 3, TRUE),
  ('Tar Baby', 1981, 3, TRUE),
  ('Beloved', 1987, 3, FALSE),
  ('Jazz', 1992, 3, TRUE),
  ('Paradise', 1997, 3, FALSE),
  ('Love', 2003, 3, FALSE),
  ('A Mercy', 2008, 3, FALSE),
  ('Home', 2012, 3, FALSE),
  ('God Help the Child', 1968, 3, TRUE);

-- Gabriel García Márquez
insert into books
  (title, publication_year, author_id, in_stock)
values
  ('In Evil Hour', 1962, 4, TRUE),
  ('One Hundred Years of Solitude', 1967, 4, FALSE),
  ('The Autumn of the Patriarch', 1975, 4, TRUE),
  ('Love in the Time of Cholera', 1985, 4, FALSE),
  ('The General in His Labyrinth', 1989, 4, TRUE),
  ('Of Love and Other Demons', 1994, 4, TRUE);

-- Elif Shafak
insert into books
  (title, publication_year, author_id, in_stock)
values
  ('The Gaze', 2000, 5, TRUE),
  ('The Flea Palace', 2002, 5, FALSE),
  ('The Saint of Incipient Insanities', 2004, 5, TRUE),
  ('The Bastard of Istanbul', 2006, 5, TRUE),
  ('Black Milk: On Writing, Motherhood, and the Harem Within', 2007, 5, FALSE),
  ('The Forty Rules of Love: A Novel of Rumi', 2009, 5, TRUE),
  ('Honour', 2011, 5, FALSE),
  ('Three Daughters of Eve', 2016, 5, TRUE),
  ('10 Minutes 38 Seconds in This Strange World', 2019, 5, TRUE);

-- Amy Tan
insert into books
  (title, publication_year, author_id, in_stock)
values
  ('The Joy Luck Club', 1989, 6, TRUE),
  ('The Kitchen God''s Wife', 1991, 6, FALSE),
  ('The Hundred Secret Senses', 1995, 6, TRUE),
  ('The Bonesetter''s Daughter', 2001, 6, FALSE),
  ('Saving Fish from Drowning', 2005, 6, TRUE),
  ('The Valley of Amazement', 2013, 6, TRUE);

-- Leo Tolstoy
insert into books
  (title, publication_year, author_id, in_stock)
values
  ('Childhood', 1852, 7, TRUE),
  ('Boyhood', 1854, 7, TRUE),
  ('Youth', 1856, 7, TRUE),
  ('Family Happiness', 1859, 7, FALSE),
  ('War and Peace', 1869, 7, TRUE),
  ('Anna Karenina', 1877, 7, FALSE),
  ('Resurrection', 1899, 7, TRUE);

insert into genres
  (genre_name)
values
  ('autobiography'),
  ('drama'),
  ('classic'),
  ('history'),
  ('fantasy'),
  ('anthology'),
  ('romance');

insert into books_genres
  (book_id, genre_id)
values
  (1, 4),
  (42, 1),
  (42, 4),
  (43, 1),
  (43, 4),
  (44, 1),
  (44, 3),
  (44, 4);