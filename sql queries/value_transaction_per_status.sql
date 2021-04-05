with customers_transactions_status
as (
select 
customers.id
, customers.firstname
, customers.lastname
, customers.country
, customers.gender
, sum(case when status = 'Completed' then amount else 0 end) as value_completed_tr
, sum(case when status = 'Pending' then amount else 0 end) as value_pending_tr
, sum(case when status = 'Refused' then amount else 0 end) as value_refused_tr
, sum(case when status = 'Refunded' then amount else 0 end) as value_refunded_tr
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
order by 
id asc 
)
select 
id
, firstname
, lastname
, value_completed_tr
, value_pending_tr
, value_refused_tr
, value_refunded_tr
from 
customers_transactions_status
