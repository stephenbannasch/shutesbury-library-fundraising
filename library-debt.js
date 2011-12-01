
var short_term_interest = 0.020;
var long_term_interest = 0.045;
var amount_of_bond = 1400000;
var short_term_years = 2.5;
var long_term_years = 19;
var current_tax_rate = 19.37;
var estimated_inflation = 0.005;
var current_valuation = 212879100;

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
  return debt_service;
}

// debt_service_by_year(1400000, 1)  => 14000
// debt_service_by_year(1400000, 2)  => 28000
// debt_service_by_year(1400000, 3)  => 28000
// debt_service_by_year(1400000, 4)  => 136684.2105263158
// debt_service_by_year(1400000, 5)  => 133368.42105263157

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
  return debt_service;
}

// total_debt_service(amount_of_bond) => 2100000.0000000005

function additional_taxes_for_library(loan_amount, year_number, home_value) {
  var library_rate = library_portion_of_tax_rate(loan_amount, year_number);
  return library_rate * home_value / 1000
}

// additional_taxes_for_library(1400000, 1, 100000)  => 6.543783893630925
// additional_taxes_for_library(1400000, 2, 100000)  => 13.022455509713286
// additional_taxes_for_library(1400000, 3, 100000)  => 12.957667173844065
// additional_taxes_for_library(1400000, 4, 100000)  => 62.93917938591451
// additional_taxes_for_library(1400000, 5, 100000)  => 61.106818837620665

// additional_taxes_for_library(1400000, 1, 243814)  => 15.954661262417304
// additional_taxes_for_library(1400000, 2, 243814)  => 31.75056967645235
// additional_taxes_for_library(1400000, 3, 243814)  => 31.59260664323617
// additional_taxes_for_library(1400000, 4, 243814)  => 153.4545308279736
// additional_taxes_for_library(1400000, 5, 243814)  => 148.98697928075646

function total_additional_taxes_for_library(loan_amount, home_value) {
  var additional_taxes = 0;
  for (var year = 1; year <= 22; year++) {
    additional_taxes += additional_taxes_for_library(loan_amount, year, home_value)
  }
  return additional_taxes;
}

// total_additional_taxes_for_library(1400000, 100000)  => 930.7340525345529
// total_additional_taxes_for_library(1400000, 243814)  => 2269.259922846595

function average_of_additional_library_taxes_per_week(loan_amount, home_value) {
  var library_taxes = total_additional_taxes_for_library(loan_amount, home_value)
  return library_taxes / (22 * 52)
}

// average_of_additional_library_taxes_per_week(1400000, 243814)  => 1.9836188136770936
// average_of_additional_library_taxes_per_week(1250000, 243814)  => 1.7710882264974044

var average_valuation = 243814;
var amount_raised = 150000;
var actual_amount_of_bond = amount_of_bond - amount_raised;

var fund_raising_goal = 400000;
var goal_amount_of_bond = amount_of_bond - fund_raising_goal;

var orig_average_weekly_cost = average_of_additional_library_taxes_per_week(amount_of_bond, average_valuation);
var actual_average_weekly_cost = average_of_additional_library_taxes_per_week(actual_amount_of_bond, average_valuation);
var goal_average_weekly_cost = average_of_additional_library_taxes_per_week(goal_amount_of_bond, average_valuation);
