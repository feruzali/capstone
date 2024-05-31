// MQ135.ino
#include <MQUnifiedsensor.h>

#define Board ("OpenCR") // Define the board used
#define Pin (A0)         // Analog pin to which MQ135 is connected
#define Voltage_Resolution (3.3) // OpenCR voltage resolution
#define ADC_Bit_Resolution (12)  // OpenCR ADC bit resolution (12 bits)
#define RatioMQ135CleanAir (3.6) // RS/R0 = 3.6 ppm 

MQUnifiedsensor MQ135(Board, Voltage_Resolution, ADC_Bit_Resolution, Pin, "MQ-135");

void setup() {
  Serial.begin(9600);

  // Set math model to calculate ppm concentration and the value of constants
  MQ135.setRegressionMethod(1); //_PPM =  a*ratio^b
  MQ135.setA(110.47); MQ135.setB(-2.862); // Constants for calibration

  MQ135.init(); // Initialize the sensor

  Serial.print(F("Calibrating..."));
  float calcR0 = 0;
  for (int i = 1; i <= 10; i++) {
    MQ135.update(); // Update the sensor readings
    calcR0 += MQ135.calibrate(RatioMQ135CleanAir);
    Serial.print(F("."));
  }
  MQ135.setR0(calcR0 / 10);
  Serial.println(F("Done!"));
  
  if (isnan(calcR0)) {
    Serial.println(F("Error: R0 is NaN, check your wiring and calibration!"));
    while (1);
  }

  Serial.print(F("R0: "));
  Serial.println(MQ135.getR0());
}

void loop() {
  MQ135.update(); // Update the sensor readings

  float airQuality = MQ135.readSensor(); // Read the sensor value in PPM
  Serial.print(F("Air Quality: "));
  Serial.print(airQuality);
  Serial.println(F(" ppm"));

  delay(2000); // Wait a few seconds between readings
}

