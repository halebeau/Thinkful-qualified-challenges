SELECT
    a.*,
    b.*
FROM authors a
INNER JOIN books b
    ON a.author_id = b.author_id
WHERE LENGTH(b.title) > 25