CREATE TABLE artists
(
  first_name varchar(255),
  last_name varchar(255),
  birthday date,
  is_alive boolean
);

INSERT INTO artists
  (first_name, last_name, birthday, is_alive)
VALUES
  ('Marie', 'Bashkirtseff', '1858-11-02', false),
  ('Rosa', 'Bonheur', '1822-03-16', false),
  ('Marina', 'Abramović', '1946-11-30', true),
  ('Yayoi', 'Kusama', '1929-03-22', true);