
function format(n, width) {
 var str = "" + n;
 for (var i = str.length; i < width; i++ ) {
   str += "0";
 }
 return str.slice(0,width)
}

function dollar_format(amount) {
  var s = "" + amount;
  var parts = s.split('.');
  if (parts.length == 1) { parts.push("0") }
  if (parts[0].length > 3) {
    var len = parts[0].length;
    parts[0] = parts[0].slice(0,len-3) + "," + parts[0].slice(len-3, len);
    parts[1] = "";
  } else {
    parts[1] = "." + format(+parts[1], 2);
  }
  return "$" + parts[0] + parts[1];
}
