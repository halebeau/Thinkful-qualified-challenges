select distinct fiscal_year, count(*), min(amount), max(amount)
from grants
group by fiscal_year
order by fiscal_year desc