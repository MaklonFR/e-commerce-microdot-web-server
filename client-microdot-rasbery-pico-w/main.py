import os
from microdot import Microdot, Response
from microdot_utemplate import render_template
import uasyncio as asyncio
import url_for as url_for
import urequests
from itertools import groupby
from bmp280 import *
from powerLab import POWERlab
from machine import Pin, I2C, ADC
import ujson
import random
import time
from boot import do_connect

i2c = I2C(1, sda = Pin(26), scl = Pin(27), freq = 1000000)
bmp = BMP280(i2c)
bmp.use_case(BMP280_CASE_INDOOR)

ip= do_connect()
print('Get IP :', ip)

ldr = ADC(Pin(26))

ip= do_connect()
print('Get IP :', ip)

app = Microdot()
Response.default_content_type = 'text/html'
IP_SERVER = "http://192.168.227.239:80"
# Directory where static files are stored
STATIC_DIR = 'static'

l1 = POWERlab(15)
l2 = POWERlab(19)
l3 = POWERlab(17)
bz = POWERlab(16)

l1.offPower()
l2.offPower()
l3.offPower()
bz.offPower()

# Define a route to fetch sensor data
@app.route('/sensor')
def get_sensor_data(request):
    # Read sensor values
    temperature = bmp.temperature  # Temperature in Celsius
    pressure = bmp.pressure/1000  # Pressure in hPa
    # Format the data into JSON
    sensor_data = {
        "temperature": f"{temperature:.2f}",
        "pressure": f"{pressure:.2f}"
    }
    return Response(sensor_data, headers={"Content-Type": "application/json"})

def fetch_all_products():
    """Fetch product data from a remote API."""
    try:
        # Replace with your actual API endpoint
        url = IP_SERVER+"/api/get_products"
        response = urequests.get(url)
        if response.status_code == 200:
            data = response.json()
        else:
            data = {"name": "N/A", "price": "N/A", "description": "N/A"}
        response.close()
    except Exception as e:
        data = {"name": "Error", "price": "Error", "description": str(e)}
    return data

# Route to fetch products
@app.route('/show/<string:cat>',  methods=['GET', 'POST'])
def api_categories(request, cat):
    cat= cat
    ipserver=IP_SERVER
    """Fetch product data from a remote API."""
    try:
        # Replace with your actual API endpoint
        url = IP_SERVER+"/api/categories/"+ cat
        response = urequests.get(url)
        if response.status_code == 200:
            products = response.json()
            return render_template("products.html", ipserver=ipserver, products=products) 
        else:
            data = {"name": "N/A", "price": "N/A", "description": "N/A"}
        response.close()
    except Exception as e:
        data = {"name": "Error", "price": "Error", "description": str(e)}
    return data

# Route to fetch description products
@app.route('/description_product/<string:idb>',  methods=['GET', 'POST'])
def show_desproduct(request, idb):
    idb= idb
    ipserver=IP_SERVER
    #return render_template("products.html")
    url = IP_SERVER+"/api/des_product/"+ idb
    try:
        response = urequests.get(url)
        if response.status_code == 200:
            products = response.json()
            return render_template("products/list_products.html", ipserver=ipserver, products=products) 
        else:
            data = {"name": "N/A", "price": "N/A", "description": "N/A"}
        response.close()
    except Exception as e:
        data = {"name": "Error", "price": "Error", "description": str(e)}
    return data
 
@app.route('/')
def index(request):
    ipserver=IP_SERVER
    title = "Products E-Commerce BOE Malang"
    des  = "Memberikan layanan Terbaik bagi Pelanggan"
    
    """Serve the index page with a list of all products."""
    products = fetch_all_products()  # Fetch all products
    print(products)
    sorted_products = sorted(products, key=lambda x: x['category_id'])
    
    grouped_products = {}
    for category, items in groupby(sorted_products, key=lambda x: x['category_id']):
        grouped_products[category] = list(items)  
    return render_template("index.html", grouped_products=grouped_products, ipserver=ipserver, products=products) 

@app.route('/orders', methods=['GET'])
def index(req):
    name = "donsky"
    orders = ["soap", "shampoo", "powder"]

    return render_template('orders.html', name=name, orders=orders)

# Function to serve static files
# Function to serve static files
@app.route('/static/<filename>')
def serve_static(request, filename):
    # Manually concatenate the path
    file_path = STATIC_DIR + '/' + filename

    try:
        # Open and read the file in binary mode ('rb')
        with open(file_path, 'rb') as file:
            file_content = file.read()
        # Determine the content type based on the file extension
        if filename.endswith('.css'):
            content_type = 'text/css'
        elif filename.endswith('.js'):
            content_type = 'application/javascript'
        elif filename.endswith('.jpg') or filename.endswith('.jpeg'):
            content_type = 'image/jpeg'
        elif filename.endswith('.png'):
            content_type = 'image/png'
        elif filename.endswith('.svg'):
            content_type = 'image/svg+xml'  # Correct MIME type for SVG    
        else:
            content_type = 'application/octet-stream'

        # Return the file content with the appropriate headers
        return Response(file_content, headers={'Content-Type': content_type})

    except OSError:
        # Return a 404 error if the file is not found
        return Response("File not found", status_code=404)

if __name__ == '__main__':
    app.run(debug=True)

