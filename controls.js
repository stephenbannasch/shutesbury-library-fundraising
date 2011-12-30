
var select_assessed_value = document.getElementById("select-assessed-value");
var select_default_assessment = document.getElementById("select-default-assessment");
var select_custom_assessment = document.getElementById("select-custom-assessment");

select_default_assessment.value = average_valuation;
select_default_assessment.textContent = dollar_format(average_valuation);

var select_amount_raised = document.getElementById("select-amount-raised");
var select_default_amount_raised = document.getElementById("select-default-amount-raised");

select_default_amount_raised.value = amount_raised;
select_default_amount_raised.textContent = dollar_format(amount_raised);

var select_tax_cost_time_period = document.getElementById("select-tax-cost-time-period");
var select_default_tax_cost_time_period = document.getElementById("select-default-tax-cost-time-period");

var select_assessment_fragment = document.createDocumentFragment();
var custom_assessment_fragment = document.createDocumentFragment();
var custom_assessment_input = document.createElement("input");
custom_assessment_input.type = 'text';
custom_assessment_fragment.appendChild(custom_assessment_input);

//
// Assessed Value Selector
//
function selectAssessedValueChange() {
  if (select_assessed_value.value == "custom") {
    select_assessment_fragment.appendChild(select_assessed_value.parentNode.replaceChild(custom_assessment_fragment, select_assessed_value));
  } else {
    assessed_value = +select_assessed_value.value;
    update_average_costs(assessed_value, amount_raised);
    generate_graphs();
  }
}

select_assessed_value.onchange = selectAssessedValueChange;

function inputCustomAssessmentChange() {
  assessed_value = +custom_assessment_input.value;
  select_custom_assessment.textContent = dollar_format(assessed_value);
  custom_assessment_fragment.appendChild(custom_assessment_input.parentNode.replaceChild(select_assessment_fragment, custom_assessment_input));
  update_average_costs(assessed_value, amount_raised);
  generate_graphs();
}

custom_assessment_input.onchange = inputCustomAssessmentChange;
custom_assessment_input.onblur = inputCustomAssessmentChange;

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
