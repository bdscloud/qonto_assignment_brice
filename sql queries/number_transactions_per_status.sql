with customers_transactions_status
as (
select 
customers.id
, customers.firstname
, customers.lastname
, customers.country
, customers.gender
, transaction_status.status
, case when status = 'Completed' then 1 else 0 end as completed_transaction
, case when status = 'Pending' then 1 else 0 end as pending_transaction 
, case when status = 'Refunded' then 1 else 0 end as refunded_transaction
, case when status = 'Refused' then 1 else 0 end as refused_transaction
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
group by 
customers.id
, customers.firstname
, customers.lastname
, customers.country
, customers.gender
, transaction_status.status
order by 
id asc 
)
select 
id
, firstname
, lastname
, sum(completed_transaction) as nb_completed_tr
, sum(pending_transaction) as nb_pending_tr
, sum(refunded_transaction) as nb_refunded_tr
, sum(refused_transaction) as nb_refused_tr
from 
customers_transactions_status
group by 
id
, firstname
, lastname
order by 
id

