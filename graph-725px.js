var r = Raphael("raised"),
   c = Raphael("cost"),
   colors1 = ['#ff0000','#00ff00','#ffffff'],
   colors2 = ['#00ff00','#ff0000','#ffffff'],
   txtattr1 = { font: "22px 'Fontin Sans', Fontin-Sans, sans-serif", "font-weight": "bold"},
   txtattr2 = { font: "22px 'Fontin Sans', Fontin-Sans, sans-serif", "font-weight": "bold", fill: "#fff" },
   txtattr3 = { font: "20px 'Fontin Sans', Fontin-Sans, sans-serif", "font-weight": "bold" },
   txtattr4 = { font: "14px 'Fontin Sans', Fontin-Sans, sans-serif", "font-weight": "bold", "font-style": "italic" };

function generate_graphs() {
 var r_ytop = 70, r_ybot = 545, r_yextent = r_ybot-r_ytop,
     raised = amount_raised / fund_raising_goal;
 r.remove();
 r = Raphael("raised");
 r.barchart(-10, r_ytop, 190, r_ybot, [[amount_raised], [fund_raising_goal-amount_raised]], 
   {
      stacked: true, 
      type: "sharp", 
      colors: colors1,
   });
 r.text(85, 50, "Raising Funds\nFor Library").attr(txtattr1);
 if (amount_raised < fund_raising_goal) {
   r.text(85, r_ytop + 80, "Goal\n" + dollar_format(fund_raising_goal)).attr(txtattr1);
 }
 r.text(85, (r_ybot + 100) - raised * r_yextent, dollar_format(amount_raised) + "\nRaised").attr(txtattr2);
 r.text(85, (r_ytop + r_ybot - 3), "as of " + amount_raised_date).attr(txtattr4);

 var c_ytop = 80, c_ybot = 535, c_yextent = c_ybot-c_ytop;
 c.remove();
 c = Raphael("cost");
 c.barchart(-10, c_ytop, 190, c_ybot, [[fund_raising_goal-amount_raised], [amount_raised]], 
    {
       stacked: true, 
       type: "square", 
       colors: colors2,
    }).scale(1, -1.0);
  c.text(85, 50, "Lowers Taxes\n" + "per " + tax_cost_time_period).attr(txtattr1);
  c.text(85, 140, "From\n" + dollar_format(orig_average_cost, 4)).attr(txtattr1);
  c.text(85, (10 + c_ytop) + raised * c_yextent, "To " + dollar_format(actual_average_cost, 5)).attr(txtattr2);
  if (amount_raised < fund_raising_goal) {
    c.text(85, c_ybot + 35, "Goal " + dollar_format(goal_average_cost, 5)).attr(txtattr3);
   }
   c.text(85, (c_ytop + c_ybot + 5), "on " + dollar_format(average_valuation) + " average\n property assessment").attr(txtattr4);
}
