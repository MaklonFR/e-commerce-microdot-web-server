const product = [];
product[0]= "Labtob Lenovo";
product[1]= "HP Samsung";
product[2]= "HP Apple";

product[3]= "Speaker Aktif";
product[4]= "Baju Kaos Pria";
product[5]= "Baju Kaos Wanita";

product[6]= "Sabun Lefboy";
product[7]= "Beras Malang";
product[8]= "Botol Air Mineral";
product[9]= "Tapawer";

// basic bar chart
var options2 = {
  chart: {
    height: 350,
    type: "bar",
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380],
    },
  ],
  xaxis: {
    categories: [
      product[0],
      product[1],
      product[2],
      product[3],
      product[4],
      product[5],
      product[6],
      product[7],
      product[8],
      product[9],
    ],
  },
  colors: [AdmiroAdminConfig.primary],
};

var chart2 = new ApexCharts(document.querySelector("#basic-bar"), options2);

chart2.render();

