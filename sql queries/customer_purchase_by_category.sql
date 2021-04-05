
with table1 
as (
select 
customers.id
, customers.firstname
, customers.lastname
, type
, sum(case when type = 'Book' then 1 else 0 end) as nb_book
, sum(case when type = 'Music' then 1 else 0 end) as nb_music
, sum(case when type = 'Clothes' then 1 else 0 end) as nb_clothes
, sum(case when type = 'Shoes' then 1 else 0 end) as nb_shoes
from 
customers
left join 
transactions
on
customers.id = transactions.customer_id
left join 
transaction_status
on
transactions.status_code = transaction_status.code
left join 
products
on
transactions.product_id = products.id
where 
transaction_status.status = 'Completed'
group by 
customers.id
, firstname
, lastname
, type
order by 
id asc 
)
select 
id
, firstname
, lastname
, case when sum(nb_book) > 0 then true else false end as purchased_book
, case when sum(nb_music) > 0 then true else false end as purchased_music
, case when sum(nb_clothes) > 0 then true else false end as purchased_clothes
, case when sum(nb_shoes) > 0 then true else false end as purchased_shoes
from 
table1
group by 
id
, firstname
, lastname
