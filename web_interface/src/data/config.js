const Config = {
	ROSBRIDGE_SERVER_IP: '172.20.10.4',
	ROSBRIDGE_SERVER_PORT: '9090',
	CMD_VEL_TOPIC: '/cmd_vel',
	GOAL_TOPIC: '/move_base_simple/goal',
	VIDEO_STREAM_URL:
		'http://172.20.10.4:8080/stream?topic=/raspicam_node/image&type=mjpeg&width=300&height=200',
}

export default Config
