
var select_assessed_value = document.getElementById("select-assessed-value");
var select_default_assessment = document.getElementById("select-default-assessment");
var select_custom_assessment = document.getElementById("select-custom-assessment");

select_default_assessment.value = average_valuation;
select_default_assessment.textContent = dollar_format(average_valuation);

var select_amount_raised = document.getElementById("select-amount-raised");
var select_default_amount_raised;
function updateAmoutRaisedSelector() {
  var children = Sizzle("#select-amount-raised > *");
  for(var i = 0; i < children.length; i++) {
    select_amount_raised.removeChild(children[i]);
  }
  select_default_amount_raised = document.createElement("option");
  select_default_amount_raised.value = amount_raised;
  select_default_amount_raised.textContent = dollar_format(amount_raised);
  select_amount_raised.appendChild(select_default_amount_raised);
  var option = document.createElement("option");
  option.value = "";
  option.diabled = "disabled";
  option.textContent = "other values ...";
  select_amount_raised.appendChild(option);
  for (var amount = Math.round(amount_raised/100000) * 100000; amount <= fund_raising_goal; amount += 100000) {
    option = document.createElement("option");
    option.value = amount;
    option.textContent = dollar_format(amount);
    select_amount_raised.appendChild(option);
  }
}

var select_goal = document.getElementById("select-goal");

var select_tax_cost_time_period = document.getElementById("select-tax-cost-time-period");
var select_default_tax_cost_time_period = document.getElementById("select-default-tax-cost-time-period");

//
// A collection of spans who have numbers and text that will be updated
// dynamically when the user changes assumptions on the page.
//
var fund_raising_goal_spans = Sizzle("span.goal");
var tax_cost_time_period_spans = Sizzle("span.tax-cost-time-period");
var tax_cost_incremental_spans = Sizzle("span.tax-cost-incremental");
var original_tax_cost_incremental_spans = Sizzle("span.original-tax-cost-incremental");
var goal_tax_cost_incremental_spans = Sizzle("span.goal-tax-cost-incremental");
var goal_percent_spans = Sizzle("span.goal-percent");

function updateSpans() {
  for(var i = 0; i < original_tax_cost_incremental_spans.length; i++) {
    original_tax_cost_incremental_spans[i].textContent = dollar_format(orig_average_cost);
  }

  for(var i = 0; i < fund_raising_goal_spans.length; i++) {
    fund_raising_goal_spans[i].textContent = dollar_format(fund_raising_goal);
  }

  for(var i = 0; i < tax_cost_time_period_spans.length; i++) {
    if (tax_cost_time_period == "total") {
      tax_cost_time_period_spans[i].textContent = tax_cost_time_period;
    } else {
      tax_cost_time_period_spans[i].textContent = tax_cost_time_period + "ly";
    }
  }

  for(var i = 0; i < tax_cost_incremental_spans.length; i++) {
    tax_cost_incremental_spans[i].textContent = dollar_format(actual_average_cost);
  }

  for(var i = 0; i < original_tax_cost_incremental_spans.length; i++) {
    original_tax_cost_incremental_spans[i].textContent = dollar_format(orig_average_cost);
  }

  for(var i = 0; i < original_tax_cost_incremental_spans.length; i++) {
    goal_tax_cost_incremental_spans[i].textContent = dollar_format(goal_average_cost);
  }

  for(var i = 0; i < goal_percent_spans.length; i++) {
    goal_percent_spans[i].textContent = Math.floor((1 - goal_average_cost/orig_average_cost) * 100) + "%";
  }
}

if (select_goal) {
  select_goal.value = fund_raising_goal;
}

var select_assessment_fragment = document.createDocumentFragment();
var custom_assessment_fragment = document.createDocumentFragment();
var custom_assessment_input = document.createElement("input");
custom_assessment_input.type = 'text';
custom_assessment_fragment.appendChild(custom_assessment_input);

//
// "Assessed Value for Property" Selector
//
function selectAssessedValueChange() {
  if (select_assessed_value.value == "custom") {
    select_assessment_fragment.appendChild(select_assessed_value.parentNode.replaceChild(custom_assessment_fragment, select_assessed_value));
    custom_assessment_input.focus();
    if (+custom_assessment_input.value == 0) { return };
    assessed_value = custom_assessment_input.value
  } else {
    assessed_value = +select_assessed_value.value;
  }
  update_average_costs(assessed_value, amount_raised);
  generate_graphs();
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
// "Funds Raised" Selector
//
function selectFundraisingChange() {
  amount_raised = +select_amount_raised.value;
  update_average_costs(assessed_value, amount_raised);
  generate_graphs();
}

select_amount_raised.onchange = selectFundraisingChange;

//
// "Goal": Fundraising Goal Selector
//
function selectFundraisingGoalChange() {
  fund_raising_goal = +select_goal.value;
  update_average_costs(assessed_value, amount_raised);
  updateSpans();
  updateAmoutRaisedSelector();
  generate_graphs();
}

if (select_goal) {
  select_goal.onchange = selectFundraisingGoalChange;
}

//
// "Estimate Taxes by": Select Tax Time Period Selector
//
function selectTaxCostTimePeriodChange() {
  tax_cost_time_period = select_tax_cost_time_period.value;
  update_average_costs(assessed_value, amount_raised, tax_cost_time_period);
  generate_graphs();
  updateSpans();
}

select_tax_cost_time_period.onchange = selectTaxCostTimePeriodChange;

updateAmoutRaisedSelector();
selectTaxCostTimePeriodChange();