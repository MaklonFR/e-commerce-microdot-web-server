from machine import Pin, I2C
from microdot import Microdot, Response

# Initialize I2C for BME280
i2c = I2C(1, scl=Pin(5), sda=Pin(4))

# Import the BME280 library
try:
    from bme280 import BME280
except ImportError:
    raise ImportError("Please install the BME280 library on your Pico.")

# Initialize the BME280 sensor
bme = BME280(i2c=i2c)

# Initialize Microdot app
app = Microdot()

# Define a route to fetch sensor data
@app.route('/sensor')
def get_sensor_data(request):
    temperature, pressure, humidity = bme.read_compensated_data()
    temp_c = temperature / 100.0
    press_hpa = pressure / 25600.0
    humid_perc = humidity / 1024.0
    sensor_data = {
        "temperature": f"{temp_c:.2f}",
        "pressure": f"{press_hpa:.2f}",
        "humidity": f"{humid_perc:.2f}"
    }
    return Response(sensor_data, headers={"Content-Type": "application/json"})

# Define the root route
@app.route('/')
def index(request):
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sensor Data</title>
        <style>
            body { font-family: Arial, sans-serif; }
            #data { margin-top: 20px; }
            .sensor { font-size: 1.5em; margin-bottom: 10px; }
        </style>
    </head>
    <body>
        <h1>BME280 Sensor Data</h1>
        <div id="data">
            <div id="temperature" class="sensor">Temperature: Loading...</div>
            <div id="pressure" class="sensor">Pressure: Loading...</div>
            <div id="humidity" class="sensor">Humidity: Loading...</div>
        </div>
        <script>
            async function fetchSensorData() {
                try {
                    const response = await fetch('/sensor');
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    const data = await response.json();

                    // Update the HTML with the fetched data
                    document.getElementById('temperature').textContent = `Temperature: ${data.temperature} °C`;
                    document.getElementById('pressure').textContent = `Pressure: ${data.pressure} hPa`;
                    document.getElementById('humidity').textContent = `Humidity: ${data.humidity} %`;
                } catch (error) {
                    console.error('Error fetching sensor data:', error);
                }
            }

            // Fetch data on page load and every 5 seconds
            fetchSensorData();
            setInterval(fetchSensorData, 5000);
        </script>
    </body>
    </html>
    """

if __name__ == '__main__':
    app.run(debug=True)

