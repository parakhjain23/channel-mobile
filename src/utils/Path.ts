import {Platform} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';

export const LOCAL_PATH = Platform.select({
  ios: `${ReactNativeBlobUtil.fs.dirs.CacheDir}/sound.m4a`,
  android: `${ReactNativeBlobUtil.fs.dirs.CacheDir}/sound.mp3`,
});

export const RECORING_PATH = Platform.select({
  ios: `sound.m4a`,
  android: `${ReactNativeBlobUtil.fs.dirs.CacheDir}/sound.mp3`,
});
