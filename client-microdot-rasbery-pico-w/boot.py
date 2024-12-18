# boot.py -- run on boot-up
import network, utime

# Replace the following with your WIFI Credentials
SSID = "Maklon09"
SSI_PASSWORD = "9876543200"

def do_connect():
    import network
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print('connecting to network...')
        sta_if.active(True)
        sta_if.connect(SSID, SSI_PASSWORD)
        while not sta_if.isconnected():
            pass
    print('Connected! Network config:', sta_if.ifconfig())
    
    ip= sta_if.ifconfig()[0]
    return ip

print("Connecting to your wifi..." '')
do_connect()
