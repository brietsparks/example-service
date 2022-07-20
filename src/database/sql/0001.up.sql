create table lists
(
    id                 uuid primary key,
    creation_timestamp timestamptz default (now() at time zone 'utc'),
    name               varchar(255) not null
);

create table items
(
    id                 uuid primary key,
    list_id            uuid         not null references lists (id),
    creation_timestamp timestamptz default (now() at time zone 'utc'),
    name               varchar(255) not null
);

