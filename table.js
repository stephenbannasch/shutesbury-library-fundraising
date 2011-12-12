function make_table() {
  var table_element = document.getElementById("datatable");

  function empty_table() {
    return table_element.getElementsByTagName("tr").length == 0
  }

  function add_row() {
    return table_element.appendChild(document.createElement("tr"));
  }

  var title_row = add_row(),
      results_row = add_row();

  function add_data(row, content, el) {
    el = el || "td";
    row.appendChild(document.createElement(el))
      .textContent = content;
  }

  function add_column(title, data) {
    if (empty_table) { add_data(title_row, title, "th") };
    add_data(results_row, data)
  }
  
  var value = 100000;
  add_column("Assessment", dollar_format(value));
  add_column("Yearly", dollar_format(average_of_additional_library_taxes_per_year(actual_amount_of_bond, value)));
  add_column("Quarterly", dollar_format(average_of_additional_library_taxes_per_quarter(actual_amount_of_bond, value)));
  add_column("Monthly", dollar_format(average_of_additional_library_taxes_per_month(actual_amount_of_bond, value)));
  add_column("Weekly", dollar_format(average_of_additional_library_taxes_per_week(actual_amount_of_bond, value)));
  value += 25000;

  for (var value = 125000; value < 400000; value += 25000) {
    results_row = add_row();
    add_data(results_row, dollar_format(value));
    add_data(results_row, dollar_format(average_of_additional_library_taxes_per_year(actual_amount_of_bond, value)));
    add_data(results_row, dollar_format(average_of_additional_library_taxes_per_quarter(actual_amount_of_bond, value)));
    add_data(results_row, dollar_format(average_of_additional_library_taxes_per_month(actual_amount_of_bond, value)));
    add_data(results_row, dollar_format(average_of_additional_library_taxes_per_week(actual_amount_of_bond, value)));
  }

  // var results = [];
  // for (var value = 100000; value < 400000; value += 25000) {
  //   results.push([value, average_of_additional_library_taxes_per_month(actual_amount_of_bond, value)])
  // }
  // add_column("Assessment", dollar_format(results[0][0]));
  // add_column("per Month", dollar_format(results[0][1]));
}

var title_amount_raised = document.getElementById("title-amount-raised");
title_amount_raised.textContent = dollar_format(amount_raised);

generate_graphs();
make_table();
