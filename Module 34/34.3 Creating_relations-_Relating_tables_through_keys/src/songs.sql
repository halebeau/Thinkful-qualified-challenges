create table songs 
(
    song_id 
    INTEGER 
    primary key generated by default as identity,

    song_name 
    varchar(100) 
    default 'no song title',

    album_name 
    varchar(100) 
    default 'no album title',

    artist 
    INTEGER 
    references artists(artist_id)  
    not null
)