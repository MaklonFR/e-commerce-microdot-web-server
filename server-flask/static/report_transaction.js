 document.addEventListener('DOMContentLoaded', function() {
   x= document.getElementById('form_year').style.display = "none";
   y= document.getElementById('form_month').style.display = "none";
   z= document.getElementById('form_day').style.display = "none";
 });

 function showFormLap(){
    // Get the select element
    var selectElement = document.getElementById('period');
    // Get the selected value
    var selectedValue = selectElement.value;
        console.log(selectedValue);

    if (selectedValue === "3") {
        // Display the selected value
        document.getElementById('form_day').style.display = "none"
    } else {
        document.getElementById('form_day').style.display = "block"
    }
   /* if (selectedValue === "0") {
        // Display the selected value
        document.getElementById('form_year').style.display = "block"
        document.getElementById('form_month').style.display = "none"
        document.getElementById('form_day').style.display = "none"
    }
    if (selectedValue === "1") {
        // Display the selected value
        document.getElementById('form_year').style.display = "none"
        document.getElementById('form_month').style.display = "block"
        document.getElementById('form_day').style.display = "none"
    }
    if (selectedValue === "2") {
        // Display the selected value
        document.getElementById('form_year').style.display = "none"
        document.getElementById('form_month').style.display = "none"
        document.getElementById('form_day').style.display = "block"
    }*/
}