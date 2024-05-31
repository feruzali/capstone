import os
from twilio.rest import Client
import Adafruit_DHT
from MQUnifiedSensor import MQUnifiedSensor  # Adjust import based on the actual library you are using
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Twilio credentials from environment variables
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')
RECEIVER_PHONE_NUMBER = os.getenv('RECEIVER_PHONE_NUMBER')

# Sensor configurations
DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 4  # GPIO pin connected to the DHT22 sensor

MQ_PIN = 0  # Analog pin connected to the MQ135 sensor
MQ_TYPE = "MQ-135"
MQ_BOARD = "ESP-32"

# Function to read data from DHT22 sensor
def read_dht22():
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
    return humidity, temperature

# Function to read data from MQ135 sensor
def read_mq135():
    mq = MQUnifiedSensor(MQ_BOARD, 5.0, 10, MQ_PIN, MQ_TYPE)
    mq.init()
    mq.setRegressionMethod(1)  # Using the exponential regression method
    mq.setA(110.47)
    mq.setB(-2.862)

    mq.setR0(76.63)  # Calibrated R0 value
    concentration = mq.readSensor()
    return concentration

# Function to send SMS with sensor data
def sending_sms():
    try:
        # Read sensor data
        humidity, temperature = read_dht22()
        mq_concentration = read_mq135()

        # Prepare message text
        text = (
            f"Current environmental data:\n"
            f"Temperature: {temperature:.2f}°C\n"
            f"Humidity: {humidity:.2f}%\n"
            f"Air Quality (MQ135): {mq_concentration:.2f} ppm"
        )

        # Send SMS
        client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            body=text,
            from_=TWILIO_PHONE_NUMBER,
            to=RECEIVER_PHONE_NUMBER
        )

        return 'The message was successfully sent!'
    except Exception as ex:
        return 'Something went wrong... :(', ex

def main():
    response = sending_sms()
    print(response)

if __name__ == '__main__':
    main()
