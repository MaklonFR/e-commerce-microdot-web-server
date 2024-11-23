(function ($) {

   const d = new Date();
   let text = d.toLocaleString();
   document.getElementById("date-info").innerHTML = text;

})(jQuery);