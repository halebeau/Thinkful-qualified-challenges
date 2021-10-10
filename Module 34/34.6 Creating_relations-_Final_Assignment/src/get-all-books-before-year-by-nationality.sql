SELECT
    a.*,
    b.*
FROM authors a
INNER JOIN books b
      ON a.author_id = b.author_id
WHERE a.nationality != 'United States of America'
AND b.publication_year < 2005