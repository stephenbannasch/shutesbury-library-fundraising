
var select_assessed_value = document.getElementById("select-assessed-value");
var select_default_assessment = document.getElementById("select-default-assessment");

select_default_assessment.value = average_valuation;
select_default_assessment.textContent = dollar_format(average_valuation);

var select_amount_raised = document.getElementById("select-amount-raised");
var select_default_amount_raised = document.getElementById("select-default-amount-raised");

select_default_amount_raised.value = amount_raised;
select_default_amount_raised.textContent = dollar_format(amount_raised);


//
// Assessed Value Selector
//
function selectAssessedValueChange() {
  assessed_value = +select_assessed_value.value;
  update_average_costs(assessed_value, amount_raised);
  generate_graphs();
}

select_assessed_value.onchange = selectAssessedValueChange;
// select_assessed_value.onchange();

//
// Fundraising Selector
//
function selectFundraisingChange() {
  amount_raised = +select_amount_raised.value;
  update_average_costs(assessed_value, amount_raised);
  generate_graphs();
}

select_amount_raised.onchange = selectFundraisingChange;
// select_amount_raised.onchange();

generate_graphs();