import React from 'react';
import AudioRecordingPlayer from '../components/AudioRecorderPlayer';
import {View} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
const TestComp = () => {
  console.log(`${RNFetchBlob.fs.dirs.CacheDir}/sound.mp3`);
  return (
    <View style={{flex: 1}}>
      <AudioRecordingPlayer
        remoteUrl={`${RNFetchBlob.fs.dirs.CacheDir}/sound.mp3`}
      />
    </View>
  );
};
export default TestComp;
