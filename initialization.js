var dollar_amount_raised = dollar_format(amount_raised);
var amount_raised_list = document.getElementsByClassName("amount-raised");
for (var i = 0; i < amount_raised_list.length; i++) {
  amount_raised_list[i].textContent = dollar_amount_raised;
}

var raised = document.getElementById("raised");

var last_updated = document.getElementById("last-updated");
if (last_updated) { last_updated.textContent = amount_raised_date };

generate_graphs();

//
var equals = document.getElementById("equals");
var actual_graphic_width = raised.clientWidth;

if (actual_graphic_width !== 240 && actual_graphic_width !== 163) {
  equals.style.left = equals.offsetLeft + 4 + "px";
  equals.style.top = equals.offsetTop + 4 + "px";
}
