with table1
as (
select 
customers.id
, customers.firstname
, customers.lastname
, customers.created_at as cstmr_creat_date
, MIN(transactions.created_at) OVER ( PARTITION BY customers.id
, customers.firstname
, customers.lastname,
customers.created_at
) as first_trans_date
, MAX(transactions.created_at) OVER ( PARTITION BY customers.id
, customers.firstname
, customers.lastname,
customers.created_at
) as last_trans_date
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
where 
transaction_status.status = 'Completed'

order by 
id asc 
)
select 
id
, firstname
, lastname
, cstmr_creat_date
, first_trans_date
, last_trans_date
from 
table1
group by 
id
, firstname
, lastname
, cstmr_creat_date
, first_trans_date
, last_trans_date

