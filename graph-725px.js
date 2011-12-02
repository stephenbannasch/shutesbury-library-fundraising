
window.onload = function () {
  
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
     txtattr1 = { font: "24px 'Fontin Sans', Fontin-Sans, sans-serif", "font-weight": "bold"},
     txtattr2 = { font: "24px 'Fontin Sans', Fontin-Sans, sans-serif", "font-weight": "bold", fill: "#fff" };

 r.barchart(-5, 40, 200, 590, [[amount_raised], [fund_raising_goal-amount_raised]], 
    {
       stacked: true, 
       type: "sharp", 
       colors: colors1,
    });
  r.text(95, 30, "Raising Funds").attr(txtattr1);
  r.text(95, 120, "Goal\n" + dollar_format(fund_raising_goal)).attr(txtattr2);
  r.text(95, 475, dollar_format(amount_raised) + "\nRaised").attr(txtattr2);
  r.text(95, 590, "$0").attr(txtattr1);

  c.barchart(-5, 50, 200, 600, [[fund_raising_goal-amount_raised], [amount_raised]], 
     {
        stacked: true, 
        type: "sharp", 
        colors: colors2,
     }).scale(1, -1);
   c.text(95, 30, "Lowers Taxes").attr(txtattr1);
   c.text(95, 110, "From $" + format(orig_average_monthly_cost, 4) + "\nper month").attr(txtattr1);
   c.text(95, 255, "To $" + format(actual_average_monthly_cost, 4)).attr(txtattr2);
   c.text(95, 545, "Goal\n$" + format(goal_average_monthly_cost, 4)).attr(txtattr2);
}