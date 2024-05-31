import React, { Component } from 'react'
import Config from '../data/config'

class VideoStreamView extends Component {
	state = {
		connected: false,
		ros: null,
	}

	render() {
		return (
			<div>
				<div id='mjpeg'>
					<img
						id='my_image'
						src={`${Config.VIDEO_STREAM_URL}`}
						style={{
							position: 'relative',
							zIndex: '99',
							height: 'auto',
							marginBottom: '-128px',
							width: '98%',
							objectfit: 'contain',
						}}
						alt='loading...'
					></img>
				</div>
			</div>
		)
	}
}

export default VideoStreamView
