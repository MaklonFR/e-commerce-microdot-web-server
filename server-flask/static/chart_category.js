(function ($) {
  let category = [];
  let dataArray = [];
  google.charts.load("current", { packages: ["corechart", "bar"] });
  google.charts.load("current", { packages: ["line"] });
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawBasic);

 function drawBasic() {
    if ($("#pie-chart").length > 0) {
        fetch("/api/sold_out_products_summary")
        .then(response => response.json())
        .then(data => {
            category = data; //simpan data respon pada array category
            //console.log(category); // Menampilkan data hasil filter

        console.log(category);
        // Add the header row
        dataArray.push(['Category', 'Sales']);
        //tambahkan data response category pada dataArray
        for (let i = 0; i < category.length; i++) {
            dataArray.push([category[i].name, category[i].total_sales]);
        }

        var data = google.visualization.arrayToDataTable(dataArray); //simpan dataArray untuk ditampilkan pada chart
        var options = {
                        title: "Daftar Kategori Produk Paling Banyak Terjual",
                        is3D: true,
                        width: "100%",
                        height: 300,
                        colors: [
                        "#e74b2b",
                        "#8B5DFF",
                        "#3eb95f",
                        AdmiroAdminConfig.secondary,
                        ],
        };
        var chart = new google.visualization.PieChart(document.getElementById("pie-chart"));
        chart.draw(data, options); //tampilkan data pada chart

        })
        .catch(error => {
        console.error('Error fetching data:', error);
        });
    }

  }
})(jQuery);
