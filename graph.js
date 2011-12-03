
function dollar_format(amount) {
  var s = "";
  s += amount;
  return "$" + s.slice(0,3) + "," + s.slice(3,6)
}

function format(n, width) {
 var str = "" + n;
 for (var i = str.length; i < width; i++ ) {
   str += "0";
 }
 return str.slice(0,width)
}

var r = Raphael("raised"),
    c = Raphael("cost"),
    colors1 = ['#ff0000','#00ff00','#ffffff'],
    colors2 = ['#00ff00','#ff0000','#ffffff'],
    txtattr1 = { font: "30px 'Fontin Sans', Fontin-Sans, sans-serif", "font-weight": "bold"},
    txtattr2 = { font: "30px 'Fontin Sans', Fontin-Sans, sans-serif", "font-weight": "bold", fill: "#fff" };

function generate_graphs() {
  var r_ytop = 40, r_ybot = 590, r_yextent = r_ybot-r_ytop;
  r.remove();
  r = Raphael("raised");
  r.barchart(0, r_ytop, 240, r_ybot, [[amount_raised], [fund_raising_goal-amount_raised]], 
    {
       stacked: true, 
       type: "sharp", 
       colors: colors1,
    });
  r.text(120, 30, "Raising Funds").attr(txtattr1);
  r.text(120, 130, "Goal\n" + dollar_format(fund_raising_goal)).attr(txtattr2);
  r.text(120, (640 + 70) - amount_raised / fund_raising_goal * r_yextent, dollar_format(amount_raised) + "\nRaised").attr(txtattr2);
  r.text(120, 590, "$0").attr(txtattr1);

  var c_ytop = 50, c_ybot = 590, c_yextent = c_ybot-c_ytop;
  c.remove();
  c = Raphael("cost");
  c.barchart(0, c_ytop, 240, c_ybot, [[fund_raising_goal-amount_raised], [amount_raised]], 
     {
        stacked: true, 
        type: "square", 
        colors: colors2,
     }).scale(1, -1.0);
   c.text(120, 30, "Lowers Taxes").attr(txtattr1);
   c.text(120, 110, "From $" + format(orig_average_monthly_cost, 4) + "\nper month").attr(txtattr1);
   c.text(120, (0 + 50) + amount_raised / fund_raising_goal * c_yextent, "To $" + format(actual_average_monthly_cost, 4)).attr(txtattr2);
   c.text(120, c_ybot - 10, "Goal $" + format(goal_average_monthly_cost, 4)).attr(txtattr2);
}
