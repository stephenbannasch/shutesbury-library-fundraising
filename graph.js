
var r = Raphael("raised"),
    c = Raphael("cost"),
    colors1 = ['#ff0000','#00ff00','#ffffff'],
    colors2 = ['#00ff00','#ff0000','#ffffff'],
    txtattr1 = { font: "30px 'Fontin Sans', Fontin-Sans, sans-serif", "font-weight": "bold" },
    txtattr2 = { font: "30px 'Fontin Sans', Fontin-Sans, sans-serif", "font-weight": "bold", fill: "#fff" },
    txtattr3 = { font: "26px 'Fontin Sans', Fontin-Sans, sans-serif", "font-weight": "bold" },
    txtattr4 = { font: "18px 'Fontin Sans', Fontin-Sans, sans-serif", "font-weight": "bold", "font-style": "italic" };

function generate_graphs() {
  var r_ytop = 70, r_ybot = 540, r_yextent = r_ybot-r_ytop,
  percent_raised = amount_raised / fund_raising_goal;
  r.remove();
  r = Raphael("raised");
  r.barchart(0, r_ytop, 240, r_ybot, [[amount_raised], [fund_raising_goal-amount_raised]], 
    {
       stacked: true, 
       type: "sharp", 
       colors: colors1,
    });
  r.text(120, 50, "Raising Funds\nFor Library").attr(txtattr1);
  if (amount_raised < fund_raising_goal) {
    r.text(120, r_ytop + 80, "Goal\n" + dollar_format(fund_raising_goal)).attr(txtattr1);
  }
  r.text(120, (r_ybot + 100) - percent_raised * r_yextent, dollar_format(amount_raised) + "\nRaised").attr(txtattr2);
  if (amount_raised == actual_amount_raised) {
    r.text(120, (r_ytop + r_ybot + 5), "as of " + amount_raised_date).attr(txtattr4);
  } else {
    r.text(120, (r_ytop + r_ybot + 5), "future projection").attr(txtattr4);
  }

  var c_ytop = 80, c_ybot = 530, c_yextent = c_ybot-c_ytop;
  c.remove();
  c = Raphael("cost");
  c.barchart(0, c_ytop, 240, c_ybot, [[fund_raising_goal-amount_raised], [amount_raised]], 
     {
        stacked: true, 
        type: "square", 
        colors: colors2,
     }).scale(1, -1.0);
   if (tax_cost_time_period == "total") {
     c.text(120, 50, "Lower Added\ntax " + tax_cost_time_period).attr(txtattr1);
   } else {
     c.text(120, 50, "Lower Added\ntax per " + tax_cost_time_period).attr(txtattr1);
   }
   c.text(120, 140, "From\n" + dollar_format(orig_average_cost, 4)).attr(txtattr1);
   c.text(120, (10 + c_ytop) + percent_raised * c_yextent, "To " + dollar_format(actual_average_cost, 5)).attr(txtattr2);
   if (amount_raised < fund_raising_goal) {
     c.text(120, c_ybot + 30, "Goal " + dollar_format(goal_average_cost, 5)).attr(txtattr3);
    }
  c.text(120, (c_ytop + c_ybot + 5), "on " + dollar_format(average_valuation) + " average\n property assessment").attr(txtattr4);
}
