(function ($) {
  "use strict";
  /*Line chart*/

  // Penjualan produk perbulan chart
  var optionsturnoverchart = {
    chart: {
      toolbar: {
        show: false,
      },
      height: 300,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      curve: "smooth",
    },
    xaxis: {
      categories: [],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    grid: {
      borderColor: "rgba(196,196,196, 0.3)",
      padding: {
        top: -20,
        right: 0,
        bottom: 0,
      },
    },
    fill: {
      opacity: 0.2,
    },
    colors: ['#0D92F4'],
    series: [
      {
        data: [],
      },
    ],
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  var chartturnoverchart = new ApexCharts(
  document.querySelector("#chart-widget7"),optionsturnoverchart
  );
  chartturnoverchart.render();

  window.setInterval(function () {

  }, 3000);
})(jQuery);