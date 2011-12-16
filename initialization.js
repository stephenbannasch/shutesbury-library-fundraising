var title_amount_raised = document.getElementById("title-amount-raised");
title_amount_raised.textContent = dollar_format(amount_raised);

var last_updated = document.getElementById("last-updated");
if (last_updated) { last_updated.textContent = amount_raised_date };

