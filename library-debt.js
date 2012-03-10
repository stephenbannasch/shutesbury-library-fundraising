
var short_term_interest = 0.020;
var long_term_interest = 0.045;
var amount_of_bond = 1400000;
var short_term_years = 2.5;
var long_term_years = 19;
var current_tax_rate = 19.37;
var estimated_inflation = 0.005;
var current_valuation = 212879100;

var tax_cost_time_period = "month";

function round_to_penny(amount) {
  return Math.round(amount * 100) / 100
}

function debt_service_by_year(loan_amount, year_number) {
  if (year_number == 1) {
    return loan_amount * short_term_interest * 0.5;
  };
  if (year_number == 2 || year_number == 3) {
    return loan_amount * short_term_interest;
  };
  var debt_service = loan_amount * short_term_interest * short_term_years;
  var principal_payment = loan_amount/long_term_years;
  var principal_outstanding = loan_amount;
  for (var year = 4; year <= year_number; year++) {
    debt_service = principal_outstanding * long_term_interest + principal_payment
    principal_outstanding -= principal_payment;
  }
  return round_to_penny(debt_service);
}

// debt_service_by_year(1400000, 1)  => 14000
// debt_service_by_year(1400000, 2)  => 28000
// debt_service_by_year(1400000, 3)  => 28000
// debt_service_by_year(1400000, 4)  => 136684.21
// debt_service_by_year(1400000, 5)  => 133368.42

function library_portion_of_tax_rate(loan_amount, year_number) {
  var new_valuation = current_valuation * Math.pow(1 + estimated_inflation, year_number) / 1000
  var debt_service = debt_service_by_year(loan_amount, year_number);
  return debt_service/new_valuation;
}

// library_portion_of_tax_rate(1400000, 1)  => 0.06543783893630925
// library_portion_of_tax_rate(1400000, 2)  => 0.13022455509713285
// library_portion_of_tax_rate(1400000, 3)  => 0.12957667173844065
// library_portion_of_tax_rate(1400000, 4)  => 0.629391793859145
// library_portion_of_tax_rate(1400000, 5)  => 0.6110681883762067

function total_debt_service(loan_amount) {
  var debt_service = 0;
  for (var year = 1; year <= 22; year++) {
    debt_service += debt_service_by_year(loan_amount, year)
  }
  return round_to_penny(debt_service);
}

// total_debt_service(amount_of_bond) => 2100000

function additional_taxes_for_library(loan_amount, year_number, home_value) {
  var library_rate = library_portion_of_tax_rate(loan_amount, year_number);
  return round_to_penny(library_rate * home_value / 1000)
}

// additional_taxes_for_library(1400000, 1, 100000)  =>   6.54
// additional_taxes_for_library(1400000, 2, 100000)  =>  13.02
// additional_taxes_for_library(1400000, 3, 100000)  =>  12.96
// additional_taxes_for_library(1400000, 4, 100000)  =>  62.94
// additional_taxes_for_library(1400000, 5, 100000)  =>  61.11
                                                              
// additional_taxes_for_library(1400000, 1, 243814)  =>  15.95
// additional_taxes_for_library(1400000, 2, 243814)  =>  31.75
// additional_taxes_for_library(1400000, 3, 243814)  =>  31.59
// additional_taxes_for_library(1400000, 4, 243814)  => 153.45
// additional_taxes_for_library(1400000, 5, 243814)  => 148.99

function total_additional_taxes_for_library(loan_amount, home_value) {
  var additional_taxes = 0;
  for (var year = 1; year <= 22; year++) {
    additional_taxes += additional_taxes_for_library(loan_amount, year, home_value)
  }
  return round_to_penny(additional_taxes);
}

// total_additional_taxes_for_library(1400000, 100000)  =>  930.74
// total_additional_taxes_for_library(1400000, 243814)  => 2269.24

function average_of_additional_library_taxes_per_week(loan_amount, home_value) {
  var library_taxes = total_additional_taxes_for_library(loan_amount, home_value)
  return round_to_penny(library_taxes / (22 * 52))
}

// average_of_additional_library_taxes_per_week(1400000, 243814)  => 1.98
// average_of_additional_library_taxes_per_week(1250000, 243814)  => 1.77
// average_of_additional_library_taxes_per_week(1000000, 243814)  => 1.42

function average_of_additional_library_taxes_per_month(loan_amount, home_value) {
  var library_taxes = total_additional_taxes_for_library(loan_amount, home_value)
  return round_to_penny(library_taxes / (22 * 12))
}

function average_of_additional_library_taxes_per_quarter(loan_amount, home_value) {
  var library_taxes = total_additional_taxes_for_library(loan_amount, home_value)
  return round_to_penny(library_taxes / (22 * 4))
}

function average_of_additional_library_taxes_per_year(loan_amount, home_value) {
  var library_taxes = total_additional_taxes_for_library(loan_amount, home_value)
  return round_to_penny(library_taxes / 22)
}

var average_valuation = 243814;
var fund_raising_goal = 400000;

var actual_amount_of_bond, goal_amount_of_bond, 
   orig_average_weekly_cost, actual_average_weekly_cost, goal_average_weekly_cost,
   orig_average_monthly_cost, actual_average_monthly_cost, goal_average_monthly_cost,
   orig_average_quarterly_cost, actual_average_quarterly_cost, goal_average_quarterly_cost,
   orig_average_yearly_cost, actual_average_yearly_cost, goal_average_yearly_cost;

function update_average_costs(assessed_value, amount_raised) {
  actual_amount_of_bond = amount_of_bond - amount_raised;
  goal_amount_of_bond = amount_of_bond - fund_raising_goal;

  // weekly costs
  orig_average_weekly_cost = average_of_additional_library_taxes_per_week(amount_of_bond, assessed_value);
  actual_average_weekly_cost = average_of_additional_library_taxes_per_week(actual_amount_of_bond, assessed_value);
  goal_average_weekly_cost = average_of_additional_library_taxes_per_week(goal_amount_of_bond, assessed_value);

  // monthly costs
  orig_average_monthly_cost = average_of_additional_library_taxes_per_month(amount_of_bond, assessed_value);
  actual_average_monthly_cost = average_of_additional_library_taxes_per_month(actual_amount_of_bond, assessed_value);
  goal_average_monthly_cost = average_of_additional_library_taxes_per_month(goal_amount_of_bond, assessed_value);

  // quarterly costs
  orig_average_quarterly_cost = average_of_additional_library_taxes_per_quarter(amount_of_bond, assessed_value);
  actual_average_quarterly_cost = average_of_additional_library_taxes_per_quarter(actual_amount_of_bond, assessed_value);
  goal_average_quarterly_cost = average_of_additional_library_taxes_per_quarter(goal_amount_of_bond, assessed_value);

  // yearly costs
  orig_average_yearly_cost = average_of_additional_library_taxes_per_year(amount_of_bond, assessed_value);
  actual_average_yearly_cost = average_of_additional_library_taxes_per_year(actual_amount_of_bond, assessed_value);
  goal_average_yearly_cost = average_of_additional_library_taxes_per_year(goal_amount_of_bond, assessed_value);

  switch(tax_cost_time_period) {
    case "week":
      orig_average_cost = orig_average_weekly_cost;
      actual_average_cost = actual_average_weekly_cost;
      goal_average_cost = goal_average_weekly_cost;
      break;
    case "month":
      orig_average_cost = orig_average_monthly_cost;
      actual_average_cost = actual_average_monthly_cost;
      goal_average_cost = goal_average_monthly_cost;
      break;
    case "quarter":
      orig_average_cost = orig_average_quarterly_cost;
      actual_average_cost = actual_average_quarterly_cost;
      goal_average_cost = goal_average_quarterly_cost;
      break;
    case "year":
      orig_average_cost = orig_average_yearly_cost;
      actual_average_cost = actual_average_yearly_cost;
      goal_average_cost = goal_average_yearly_cost;
      break;
    case "total":
      orig_average_cost = total_additional_taxes_for_library(amount_of_bond, assessed_value)
      actual_average_cost = total_additional_taxes_for_library(actual_amount_of_bond, assessed_value);
      goal_average_cost = total_additional_taxes_for_library(goal_amount_of_bond, assessed_value);
      break;
  }
}

var amount_raised = 191564.84;
var amount_raised_date = "Dec 30 2011";
var assessed_value = average_valuation;
update_average_costs(assessed_value, amount_raised);
