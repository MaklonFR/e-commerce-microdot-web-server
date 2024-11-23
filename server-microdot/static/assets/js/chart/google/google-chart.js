(function ($) {
  google.charts.load("current", { packages: ["corechart", "bar"] });
  google.charts.load("current", { packages: ["line"] });
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawBasic);
  function drawBasic() {
    const category = [];
        category[0]= "Elektronik";
        category[1]= "Fashion";
        category[2]= "Kecantikan";
        category[3]= "Makanan & Minuman";
    const product = [];
        product[0]= "Mie Sedap Goreng";
        product[1]= "Keripik Ubi";
        product[2]= "Kaos Polos Pria";
        product[3]= "Aqua";
        product[4]= "HP Samsung";

    if ($("#pie-chart2").length > 0) {
      var data = google.visualization.arrayToDataTable([
        ["Category", "Stock"],
        [category[0], 9],
        [category[1], 10],
        [category[2], 15],
        [category[3], 20],
      ]);
      var options = {
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
      var chart = new google.visualization.PieChart(
        document.getElementById("pie-chart2")
      );
      chart.draw(data, options);
    }

    if ($("#bar-chart2").length > 0) {
      var a = google.visualization.arrayToDataTable([
          [
            "Product",
            "Stock",
            {
              role: "style",
            },
          ],
          [product[0], 25, "#A04747"],
          [product[1], 17, "#798645"],
          [product[2], 12, "#CB6040"],
          [product[3], 8, "#308e87"],
          [product[4], 2, "#024CAA"],
        ]),
        d = new google.visualization.DataView(a);
      d.setColumns([
        0,
        1,
        {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation",
        },
        2,
      ]);
      var b = {
          title: "Daftar Produk Paling Banyak Terjual",
          width: "100%",
          height: 250,
          bar: {
            groupWidth: "95%",
          },
          legend: {
            position: "none",
          },
        },
        c = new google.visualization.BarChart(
          document.getElementById("bar-chart2")
        );
      c.draw(d, b);
    }
  }

})(jQuery);
