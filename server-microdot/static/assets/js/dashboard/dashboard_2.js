//////School Performance Chart
const Option = {
  series: [
    {
      name: "Suhu",
      data: [28, 32, 39, 33, 34, 38, 33, 34, 34, 36],
    },
    {
      name: "Kelembapan",
      data: [85, 84, 86, 80, 82, 84, 85, 83, 83, 86],
    },
  ],
  chart: {
    height: 250,
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: [AdmiroAdminConfig.secondary, AdmiroAdminConfig.primary],
  stroke: {
    curve: "smooth",
    width: 5,
  },
  grid: {
    show: true,
    borderColor: "#E5E5E5",
    strokeDashArray: 0,
    position: "back",
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  yaxis: {
    labels: {
      show: true,
      style: {
        fontWeight: 500,
        fontSize: '14px',
        colors: "#AAA3A0",
      },
      formatter: (value) => {
        return `${value}`;
      },
    },
  },
  xaxis: {
    title: "HAL",
    type: "category",
    categories: [
      "3s",
      "6s",
      "9s",
      "12s",
      "15s",
      "18s",
      "21s",
      "24s",
      "27s",
      "30s",
    ],
    tickAmount: 20,
    labels: {
      minHeight: undefined,
      maxHeight: 28,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontWeight: 500,
        fontSize: '14px',
        colors: "#AAA3A0",
      },
      tooltip: {
        enabled: false,
      },
    },
    axisBorder: {
      show: false,
    },
  },
  legend: {
    show: false,
  },
  responsive: [
    {
      breakpoint: 361,
      options: {
        chart: {
          height: 190,
        },
      },
    },
  ],
};
const ChartEl = new ApexCharts(
  document.querySelector("#chart-school-performance"),
  Option
);
ChartEl.render();


////////////slider-js/////////////
var swiper = new Swiper(".mySwiper1", {
  spaceBetween: 0,
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var swiper = new Swiper(".mySwiper2", {
  spaceBetween: 0,
  slidesPerView: 1,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});