# STT (Speech To Text) for ros

STT for ROS 2 using JSGF grammars.

## Installation

This module requires `simple_node` open-source module, install it first.

```shell
git clone https://github.com/uleroboticsgroup/simple_node
```

```shell
cd ~/ros_ws/src

# dependencies
sudo apt-get install -y python-dev-is-python3 libportaudio2 libportaudiocpp0 portaudio19-dev libasound-dev swig
cd speech_to_text
pip3 install -r requirements.txt
python3 ./nltk_download.py

# colcon
cd ~/ros_ws
colcon build
```

## Usage

### Launch

```shell
ros launch speech_to_text speech_to_text.launch.py
```

### Shell Example

```shell
ros action send_goal /speech_to_text/listen_once speech_to_text_msgs/action/ListenOnce {}
```
