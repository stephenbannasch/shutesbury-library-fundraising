
var select_assessed_value = document.getElementById("select-assessed-value");
var select_default_assessment = document.getElementById("select-default-assessment");

select_default_assessment.value = average_valuation;
select_default_assessment.textContent = dollar_format(average_valuation);

var select_amount_raised = document.getElementById("select-amount-raised");
var select_default_amount_raised = document.getElementById("select-default-amount-raised");

select_default_amount_raised.value = amount_raised;
select_default_amount_raised.textContent = dollar_format(amount_raised);

var select_tax_cost_time_period = document.getElementById("select-tax-cost-time-period");
var select_default_tax_cost_time_period = document.getElementById("select-default-tax-cost-time-period");

var title_amount_raised = document.getElementById("title-amount-raised");
title_amount_raised.textContent = dollar_format(amount_raised);

//
// Assessed Value Selector
//
function selectAssessedValueChange() {
  assessed_value = +select_assessed_value.value;
  update_average_costs(assessed_value, amount_raised);
  generate_graphs();
}

select_assessed_value.onchange = selectAssessedValueChange;

//
// Fundraising Selector
//
function selectFundraisingChange() {
  amount_raised = +select_amount_raised.value;
  update_average_costs(assessed_value, amount_raised);
  generate_graphs();
}

select_amount_raised.onchange = selectFundraisingChange;

//
// Select Tax Time Period Selector
//
function selectTaxCostTimePeriodChange() {
  tax_cost_time_period = select_tax_cost_time_period.value;
  update_average_costs(assessed_value, amount_raised, tax_cost_time_period);
  generate_graphs();
}

select_tax_cost_time_period.onchange = selectTaxCostTimePeriodChange;

generate_graphs();