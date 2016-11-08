CREATE TABLE matches
(
id SERIAL PRIMARY KEY,
map_name varchar(30),
game_type varchar(30),
vs_fireteam boolean not null default false,
win boolean  not null default false,
kd float,
kad float
);
