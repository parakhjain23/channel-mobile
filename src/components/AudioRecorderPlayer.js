import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';

const AudioRecordingPlayer = ({remoteUrl}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [audioKey, setaudioKey] = useState(0);
  const padZero = number => {
    return number.toString().padStart(2, '0');
  };
  const formatTime = seconds => {
    const totalSeconds = Math.floor(seconds);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
  };
  const onStartPlay = () => {
    setIsPlaying(true);
  };
  useEffect(() => {}, []);

  const onStopPlay = () => {
    setIsPlaying(false);
  };

  const handleSeek = value => {
    this.player.seek(value);
    setIsPlaying(true);
    setCurrentPositionSec(value);
  };

  const renderPlayButton = () => {
    if (isPlaying) {
      return (
        <View style={[styles.buttonsContainer]}>
          <TouchableOpacity style={[styles.buttons]} onPress={onStopPlay}>
            <Icon name="stop-circle" size={28} color={'black'} />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={[styles.buttonsContainer]}>
          <TouchableOpacity style={[styles.buttons]} onPress={onStartPlay}>
            <Icon name="play-circle" size={28} color={'black'} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  const onProgress = data => {
    setCurrentPositionSec(data.currentTime);
  };
  const onLoad = duration => {
    setCurrentDurationSec(duration.duration);
  };
  const onEnd = () => {
    setCurrentPositionSec(0);
    setIsPlaying(false);
    setaudioKey(!audioKey);
  };
  return (
    <View style={styles.container}>
      <View style={styles.playerContainer}>
        {renderPlayButton()}
        <Slider
          style={styles.sliderContainer}
          value={currentPositionSec}
          minimumValue={0}
          maximumValue={currentDurationSec}
          onSlidingComplete={handleSeek}
          thumbTintColor="#000"
          minimumTrackTintColor="#000"
          maximumTrackTintColor="#888"
          // disabled={!isPlaying}
        />
        <Text style={styles.timeText}>
          {formatTime(currentPositionSec)} / {formatTime(currentDurationSec)}
        </Text>
      </View>
      <Video
        key={audioKey}
        source={{uri: remoteUrl}}
        paused={!isPlaying}
        onProgress={onProgress}
        onLoad={onLoad}
        ref={ref => {
          this.player = ref;
        }}
        onEnd={onEnd}
        audioOnly={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 0.7,
    borderColor: 'gray',
    borderRadius: 10,
    flex: 1,
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sliderContainer: {
    flex: 1,
  },
  timeText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 0,
    marginRight: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttons: {
    backgroundColor: '#fff',
    borderRadius: 60,
    padding: 5,
  },
});

export default AudioRecordingPlayer;
