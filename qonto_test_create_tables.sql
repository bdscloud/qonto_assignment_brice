
drop table if exists public.transactions ;
drop table if exists public.transaction_status ;
drop table if exists public.products ;
drop table if exists public.addresses ;
drop table if exists public.customers ;


create table public.transactions
(
id int NOT NULL PRIMARY KEY,
customer_id INT,
status_code INT,
product_id INT,
amount decimal, 
created_at timestamp 
);

copy public.transactions
from '/Users/bricedesoras/Desktop/Tables/transactions.csv' delimiters ','  CSV HEADER;


create table public.transaction_status
(
code INT not null primary key,
status char(16)
);


copy public.transaction_status
from '/Users/bricedesoras/Desktop/Tables/transaction_status.csv' delimiters ','  CSV HEADER;


create table public.products
(
id int NOT NULL PRIMARY KEY,
type char(16),
category char(16),
price decimal
);


copy public.products
from '/Users/bricedesoras/Desktop/Tables/products.csv' delimiters ','  CSV HEADER;

create table public.addresses
(
customer_id INT not null primary key,
zipcode char(16),
city char(24),
state char(2)
);


copy public.addresses
from '/Users/bricedesoras/Desktop/Tables/addresses.csv' delimiters ','  CSV HEADER;


create table public.customers
(
id INT not null primary key,
firstname char(16),
lastname char(16),
email char(30),
created_at timestamp,
country char(2),
gender char(1)
);


copy public.customers
from '/Users/bricedesoras/Desktop/Tables/customers.csv' delimiters ','  CSV HEADER;



