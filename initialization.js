var amount_raised_spans = Sizzle("span.amount-raised");
for(var i = 0; i < amount_raised_spans.length; i++) {
  amount_raised_spans[i].textContent = dollar_format(actual_amount_raised);
}

var last_updated = Sizzle("span.last-updated");
for(var i = 0; i < last_updated.length; i++) {
  last_updated[i].textContent = amount_raised_date;
}

// generate_graphs();

var raised_element = document.getElementById("raised");
var cost_element = document.getElementById("cost");
var equals = document.getElementById("equals");

var raised_right_edge = raised_element.offsetLeft + raised_element.clientWidth;
equals.style.left = raised_right_edge - equals.clientWidth/3 + "px";
