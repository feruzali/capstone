import React, { Component } from 'react'
import Connection from '../componets/connection'
import Teleoperation from '../componets/teleoperation'
import VideoStreamView from '../componets/videostreamview'
import MapView from '../componets/mapview'
import CarouselComponent from '../componets/carousel'
import AirQualityMeter from '../componets/airquality'

import { Row, Col } from 'react-bootstrap'

class Home extends Component {
	state = {}

	render() {
		return (
			<div style={{ maxHeight: '100vh' }}>
				{/* Connection bar at the top */}
				<Row className='nomargin nopadding'>
					<Col className='nomargin nopadding box-border'>
						<Connection />
					</Col>
				</Row>

				{/* Main content with Camera and Speedometer */}
				<Row className='nomargin nopadding align-items-center'>
					<Col className='nomargin nopadding box-border align-center'>
						<VideoStreamView className='box-border' />
					</Col>

					{/* Speedometer on the right */}
					<Col className='nomargin nopadding box-border align-center' xs={3}>
						<AirQualityMeter />
						<CarouselComponent />
					</Col>
					<MapView />
				</Row>

				{/* Bottom row with Map and Teleoperation */}
				<Row className='nomargin nopadding'>
					<Col className='nomargin nopadding box-border'>
						<Teleoperation />
					</Col>
				</Row>
			</div>
		)
	}
}

export default Home
