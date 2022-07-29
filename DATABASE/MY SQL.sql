create table city_list (
id int auto_increment primary key,
name varchar(50),
area int,
population int,
gdp int,
description varchar(500)
);

insert into city_list (name, area, population, gdp, description)
values 	("Hanoi", 3358, 5067000, 42, "This is Hanoi"),
		("HCMC", 2095, 8993000, 61, "This is HCMC"),
		("Danang", 1285, 1134000, null, "This is Danang"),
        ("Thaibinh", 1542, 1942000, null, "This is Thaibinh"),
        ("Namdinh", 1669, 412350, null, "This is Namdinh");