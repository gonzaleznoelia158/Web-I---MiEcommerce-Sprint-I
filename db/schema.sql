create table if not exists categories (
id integer primary key autoincrement,
nombre text not null unique
);

create table if not exists products (
id integer primary key autoincrement,
nombre text not null,
precio real not null,
imagen text,
descripcion text,
stock integer default 0,
feature integer default 0,
category_id integer,
foreign key (category_id) references categories(id)
);

create table if not exists users (
id integer primary key autoincrement,
nombre text not null,
apellido text not null,
email text not null unique,
password text not null
);

create table if not exists orders (
id integer primary key autoincrement,
user_id integer,
total real not null,
fecha text default (datetime('now')),
foreign key (user_id) references users(id)
);

create table if not exists order_items (
id integer primary key autoincrement,
order_id integer not null,
product_id integer not null,
quantity integer not null,
subtotal real not null,
foreign key (order_id) references orders(id),
foreign key (product_id) references products(id)
);