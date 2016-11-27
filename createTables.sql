/*Make a collection called crucible doctor.
Within that collection create the following tables*/

/*stores each recorded match played*/
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

/*needs table for deaths*/

/*needs join table for matches and deaths*/

/*stores pvp map names*/
CREATE TABLE maps
(
id SERIAL PRIMARY KEY,
map varchar(30)
);

/*stores deaths*/
CREATE TABLE deaths
(
id SERIAL PRIMARY KEY,
killed_with varchar(30),
weapon_type varchar(30),
time_alive int
);
