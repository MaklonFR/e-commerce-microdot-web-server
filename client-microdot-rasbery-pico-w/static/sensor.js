
async function fetchSensorData() {
    try {
        const response = await fetch('/sensor');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        let temp = data.temperature;
        let pres = data.pressure;
        // Update the HTML with the fetched data

        $("#temperature").val(temp);
        $("#temperature").trigger('change');  // Update knob value and
         
        $("#pressure").val(pres).trigger('change');  // Update knob value and
        
        document.getElementById('te').innerHTML = `${data.temperature} °C`;
        document.getElementById('pe').innerHTML = `${data.pressure} hPa`;
        } catch (error) {
        console.error('Error fetching sensor data:', error);
    }
}

// Fetch data on page load and every 5 seconds
fetchSensorData();
setInterval(fetchSensorData, 2000);
