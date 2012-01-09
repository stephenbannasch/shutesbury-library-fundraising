var dollar_amount_raised = dollar_format(amount_raised);
var amount_raised_list = document.getElementsByClassName("amount-raised");
for (var i = 0; i < amount_raised_list.length; i++) {
  amount_raised_list[i].textContent = dollar_amount_raised;
}

var last_updated = document.getElementById("last-updated");
if (last_updated) { last_updated.textContent = amount_raised_date };

generate_graphs();

var raised_element = document.getElementById("raised");
var cost_element = document.getElementById("cost");
var equals = document.getElementById("equals");

var raised_right_edge = raised.offsetLeft + raised.clientWidth;
equals.style.left = raised_right_edge - equals.clientWidth/3 + "px";
