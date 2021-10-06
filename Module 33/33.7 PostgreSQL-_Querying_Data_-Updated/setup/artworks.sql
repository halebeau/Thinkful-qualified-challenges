CREATE TABLE artworks
(
  name varchar(255),
  medium varchar(255),
  description text
);

INSERT INTO artworks
  (name, medium, description)
VALUES
  ('The Horse Fair', 'oil on canvas', 'The painting depicts dealers selling horses at a horse market.'),
  ('Ploughing in the Nivernais', 'oil on canvas', 'It depicts two teams of oxen ploughing the land, and expresses deep commitment to the land.');