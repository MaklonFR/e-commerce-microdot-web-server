async function fetchMonthlyQuantity() {
    api = "http://192.168.227.239:80";
    try {
       const response = await fetch(api + '/api/filter_transaction_month');
       const data = await response.json();
       console.log(data);
 
       /*Get Data to apply in chart (Monyh and Quantities) from API*/
       const ctx = document.getElementById('quantityChart').getContext('2d');
             const quantityChart = new Chart(ctx, {
                 type: 'bar',
                 data: {
                     labels: data.months,
                     datasets: [{
                         label: 'Quantity per Month',
                         data: data.quantities,
                         backgroundColor: 'rgba(75, 192, 192, 0.2)',
                         borderColor: 'rgba(75, 192, 192, 1)',
                         borderWidth: 1,
                     }]
                 },
                 options: {
                     scales: {
                         y: {
                             beginAtZero: true
                         }
                     }
                 }
             });
 
    } catch (error) {
      console.error('Error fetching monthly quantities:', error);
      }
 }
 
 fetchMonthlyQuantity();
 
 