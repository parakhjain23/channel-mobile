import {Platform} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

export const LOCAL_PATH = Platform.select({
  ios: `${RNFetchBlob.fs.dirs.CacheDir}/sound.m4a`,
  android: `${RNFetchBlob.fs.dirs.CacheDir}/sound.mp3`,
});

export const RECORING_PATH = Platform.select({
  ios: `sound.m4a`,
  android: `${RNFetchBlob.fs.dirs.CacheDir}/sound.mp3`,
});
