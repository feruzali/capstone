import React, { useState, useEffect } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import ReactSpeedometer from 'react-d3-speedometer'
import '../css/bootstrap/bootstrap.min.css'

import DataValues from '../data/datavalues'



const CarouselComponent = () => {
	const [co2Value, setCo2Value] = useState(0)
	const [tempValue, setTempValue] = useState(0)
	const [humidityValue, setHumidityValue] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setCo2Value(Math.floor(Math.random() * 4) + DataValues.C02) // Random value between 0 and 2000
			setTempValue(Math.floor(Math.random() * 4) + DataValues.temp) // Random value between -10 and 40
			setHumidityValue(Math.floor(Math.random() * 4) + DataValues.humidity) // Random value between 0 and 100
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const gradientColorsCO2 = generateGradientColors(
		9,
		{ r: 0, g: 255, b: 0 },
		{ r: 255, g: 255, b: 0 },
		{ r: 255, g: 0, b: 0 }
	)
	const gradientColorsTemp = generateGradientColors(
		9,
		{ r: 0, g: 0, b: 255 },
		{ r: 0, g: 255, b: 0 },
		{ r: 255, g: 0, b: 0 }
	)
	const gradientColorsHumidity = generateGradientColors(
		9,
		{ r: 255, g: 0, b: 0 },
		{ r: 0, g: 255, b: 0 },
		{ r: 255, g: 0, b: 0 }
	)

	// Custom labels for CO2 speedometer
	const co2CustomLabels = [
		{ text: '0', position: 'OUTSIDE' },
		{ text: '', position: 'OUTSIDE' },
		{ text: '400', position: 'OUTSIDE' },
		{ text: '', position: 'OUTSIDE' },
		{ text: '1000', position: 'OUTSIDE' },
		{ text: '', position: 'OUTSIDE' },
		{ text: '1600', position: 'OUTSIDE' },
		{ text: '', position: 'OUTSIDE' },
		{ text: '2000', position: 'OUTSIDE' },
	]

	// Custom labels for Temperature speedometer
	const tempCustomLabels = [
		{ text: '-10°C', position: 'OUTSIDE' },
		{ text: '', position: 'OUTSIDE' },
		{ text: '0°C', position: 'OUTSIDE' },
		{ text: '', position: 'OUTSIDE' },
		{ text: '15°C', position: 'OUTSIDE' },
		{ text: '', position: 'OUTSIDE' },
		{ text: '30°C', position: 'OUTSIDE' },
		{ text: '', position: 'OUTSIDE' },
		{ text: '40°C', position: 'OUTSIDE' },
	]

	// Custom labels for Humidity speedometer
	const humidityCustomLabels = [
		{ text: '0%', position: 'OUTSIDE' },
		{ text: '', position: 'OUTSIDE' },
		{ text: '20%', position: 'OUTSIDE' },
		{ text: '', position: 'OUTSIDE' },
		{ text: '50%', position: 'OUTSIDE' },
		{ text: '', position: 'OUTSIDE' },
		{ text: '80%', position: 'OUTSIDE' },
		{ text: '', position: 'OUTSIDE' },
		{ text: '100%', position: 'OUTSIDE' },
	]

	return (
		<Carousel slide touch interval={3000} controls={false}>
			<Carousel.Item>
				<div className='d-flex justify-content-center'>
					<ReactSpeedometer
						width={200}
						needleHeightRatio={0.7}
						needleColor='#fffff'
						segments={9}
						value={co2Value}
						minValue={0}
						maxValue={2000}
						segmentColors={gradientColorsCO2}
						currentValueText={`CO₂: ${co2Value} ppm`}
						customSegmentLabels={co2CustomLabels}
					/>
				</div>
			</Carousel.Item>
			<Carousel.Item>
				<div className='d-flex justify-content-center'>
					<ReactSpeedometer
						width={200}
						needleHeightRatio={0.7}
						needleColor='#fffff'
						segments={9}
						value={tempValue}
						minValue={-10}
						maxValue={40}
						segmentColors={gradientColorsTemp}
						currentValueText={`Temperature: ${tempValue}°C`}
						customSegmentLabels={tempCustomLabels}
					/>
				</div>
			</Carousel.Item>
			<Carousel.Item>
				<div className='d-flex justify-content-center'>
					<ReactSpeedometer
						width={200}
						needleHeightRatio={0.7}
						needleColor='#fffff'
						segments={9}
						value={humidityValue}
						minValue={0}
						maxValue={100}
						segmentColors={gradientColorsHumidity}
						currentValueText={`Humidity: ${humidityValue}%`}
						customSegmentLabels={humidityCustomLabels}
					/>
				</div>
			</Carousel.Item>
		</Carousel>
	)
}

export default CarouselComponent
