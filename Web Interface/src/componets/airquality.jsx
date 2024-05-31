import React, { useState, useEffect } from 'react'
import ReactSpeedometer from 'react-d3-speedometer'

import DataValues from '../data/datavalues'

const AirQualityMeter = () => {
	const [value, setValue] = useState(0)

	// Define color range for the speedometer segments based on AQI categories
	const colorRange = {
		GOOD: '#4CAF50',
		MODERATE: '#FFC300',
		UNHEALTHY_SENSITIVE: '#FF5733',
		UNHEALTHY: '#FF5733',
		VERY_UNHEALTHY: '#C70039',
		HAZARDOUS: '#900C3F',
	}

	return (
		<ReactSpeedometer
			width={300}
			height={232}
			needleHeightRatio={0.7}
			segments={6} // Update segments to match the number of AQI categories
			value={value}
			minValue={0}
			maxValue={500}
			currentValueText={`Air Quality Index: ${value}`}
			segmentColors={[
				colorRange.GOOD,
				colorRange.MODERATE,
				colorRange.UNHEALTHY_SENSITIVE,
				colorRange.UNHEALTHY,
				colorRange.VERY_UNHEALTHY,
				colorRange.HAZARDOUS,
			]}
		/>
	)
}

export default AirQualityMeter
