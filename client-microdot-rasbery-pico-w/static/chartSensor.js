function showChart (){
  let arrayT = [];
  let arrayP = [];
  // Set an interval to call fetchData every 3 seconds
  setInterval(() => {
    fetchSensorDataChart().then((data) => {
       arrayT.push(data.temperature);
       arrayP.push(data.pressure);
       if ((arrayT.length) === 9) {
          console.log(arrayT);
          console.log(arrayP);
          const Option = {
            series: [
              {
                name: "Suhu",
                data: [arrayT[0],arrayT[1],arrayT[2],arrayT[3],arrayT[4],arrayT[5],arrayT[6],arrayT[7],arrayT[8]],
              },
              {
                name: "Kelembapan",
                //data: [dataArrayPre[0], dataArrayPre[1], dataArrayPre[2], dataArrayPre[3], dataArrayPre[4], dataArrayPre[5], dataArrayPre[6], dataArrayPre[7], dataArrayPre[8], dataArrayPre[9]],
               data: [arrayP[0],arrayP[1],arrayP[2],arrayP[3],arrayP[4],arrayP[5],arrayP[6],arrayP[7],arrayP[8]],
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
          arrayT = [];
          arrayP = [];
          
       }

    }).catch((error) => {
      console.error("Error:", error);
    });
  }, 1000); // 3000 milliseconds (3 seconds)
}

  
async function fetchSensorDataChart() {
try {
    const response = await fetch('/sensor');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
         return new Promise((resolve) => {
          resolve(data);
        });
    } catch (error) {
    console.error('Error fetching sensor data:', error);
}
}

// Fetch data on page load and every 5 seconds
//showChart();
setInterval(showChart, 12000);



