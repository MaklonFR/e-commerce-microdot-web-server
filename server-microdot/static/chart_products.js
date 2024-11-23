(function ($) {
    let dataArray = [];
    let products = [];
  google.charts.load("current", { packages: ["corechart", "bar"] });
  google.charts.load("current", { packages: ["line"] });
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawBasic);

    // Function to generate a random color in hexadecimal format
    function randomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

  function drawBasic() {
    if ($("#bar-chart").length > 0) {
       //Call API
       fetch("/api/sold_out_products")
         .then(response => response.json())
           .then(data => {
             products = data; //simpan data respon pada array category
             console.log(products); // Menampilkan data hasil filter

      var data = new google.visualization.DataTable();
            data.addColumn('string', 'Product');  // Categorical data (string type)
            data.addColumn('number', 'Sales');
            // Generate random colors for each data point

            //tambahkan data response product pada dataArray
            for (let i = 0; i < products.length; i++) {
                data.addRows([[products[i].name, products[i].total_sales]]);
                console.log([products[i].name]);
            }
            // Generate random colors for each data point
      var colors = [];
      for (var i = 0; i < data.getNumberOfRows(); i++) {
        colors.push(randomColor());
      }

      var b = {
          title: "Daftar Produk Paling Banyak Terjual",
          width: "100%",
          height: 250,
          colors: colors,  // Apply random colors to bars
          hAxis: {
          title: 'Stock Terjual',
          minValue: 0
        },
        vAxis: {
          title: 'Product'
        },
          bar: {
            groupWidth: "95%",
          },
          legend: {
            position: "none",
          },
        },
        c = new google.visualization.BarChart(
          document.getElementById("bar-chart")
        );
      c.draw(data, b);

      })
          .catch(error => {
            console.error('Error fetching data:', error);
      });

    }
  }
})(jQuery);
