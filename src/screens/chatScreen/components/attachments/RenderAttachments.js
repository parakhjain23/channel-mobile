import React from 'react';
import {View, Text, TouchableOpacity, Linking, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import {makeStyles as LongPressCardStyles} from '../longPressCard/LongPressCard-Styles';
import AudioRecordingPlayer from '../../../../components/AudioRecorderPlayer';
import {Doc, Pdf} from '../../../../assests/images/attachments';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {getFileType} from './file';

const Attachments = React.memo(
  ({
    isLongPressCard = false,
    attachment,
    onImagePress = () => null,
    onAttachmentPress = () => null,
    onLongPress = () => null,
  }) => {
    const {colors} = useTheme();
    const LongPressCardStyle = LongPressCardStyles(colors);

    const filePath = getFileNameFromURL(url);
    useEffect(() => {
      checkIfFileDownloaded();
    }, []);

    const checkIfFileDownloaded = async () => {
      const doesExist = await RNFetchBlob.fs.exists(
        dirs.DownloadDir + '/' + filePath,
      );
      // if (doesExist) setDoesFileExist(true)
      if (doesExist && getFileType(filePath) == FILE_TYPE.PDF) null;
      // setfileUri(dirs.DownloadDir + "/" + filePath)
      // else setDoesFileExist(false)
      // setDownloadProgress(0)
      // setisDownloading(false)
    };
    function getFilePath(url) {
      const {
        dirs: {DownloadDir, DocumentDir},
      } = ReactNativeBlobUtil.fs;
      const {config} = ReactNativeBlobUtil;
      const isIOS = Platform.OS == 'ios';
      const directory_path = Platform.select({
        ios: DocumentDir,
        android: DownloadDir,
      });
      const filePath = directory_path + '/' + getFileNameFromURL(url);

      const configOptions = Platform.select({
        ios: {
          fileCache: true,
          path: filePath,
          notification: true,
        },

        android: {
          fileCache: false,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: filePath,
            description: 'Downloading file...',
          },
        },
      });
      return filePath;
    }

    const getFileNameFromURL = url => {
      const parts = url.split('/');
      const fileNameWithExtension = parts[parts.length - 1];
      // const fileName = fileNameWithExtension.split('.').slice(0, -1).join('.');
      return fileNameWithExtension;
    };

    function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    }

    function downLoadFile(url, filePath) {
      console.log('downloadfile');
      ReactNativeBlobUtil.config({
        fileCache: true,
        path: filePath,
      })
        .fetch('GET', url)
        .progress({interval: 250}, (received, total) => {
          // setDownloadProgress(round((received / total) * 100, 0))
          console.log(round((received / total) * 100, 0));
        })
        .then(res => {
          console.log('The file saved to ', res.path());
        })
        .catch(async () => {
          console.log('in error', error);
          openFileInBrowser(url);
        });
    }

    async function openFileInBrowser(url) {
      console.log('open fijle in browerse');
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser?.open(url);
      } else {
        Linking.openURL(url);
      }
    }

    const openAttachment = async (url, contentType) => {
      const filePath = getFilePath(url);
      const doesExist = await ReactNativeBlobUtil.fs.exists(filePath);
      console.log('oopenattachment');
      try {
        if (doesExist) {
          Platform.OS === 'android'
            ? ReactNativeBlobUtil.android.actionViewIntent(
                filePath,
                contentType,
              )
            : ReactNativeBlobUtil.ios.openDocument(filePath);
        } else {
          downLoadFile(url, filePath);
        }
      } catch (error) {
        openFileInBrowser(url);
      }
    };

    return (
      <>
        {attachment?.map((item, index) => {
          return item?.contentType?.includes('image') ? (
            <TouchableOpacity
              key={index}
              style={LongPressCardStyle.imageAttachContainer}
              onPress={() => onImagePress(index)}
              onLongPress={!isLongPressCard ? onLongPress : () => null}
              activeOpacity={0.8}>
              <FastImage
                source={{uri: item?.resourceUrl}}
                style={LongPressCardStyle.imageAttachment}
              />
            </TouchableOpacity>
          ) : item?.contentType?.includes('audio') ? (
            <View key={index} style={LongPressCardStyle.audioAttachContainer}>
              <AudioRecordingPlayer remoteUrl={item?.resourceUrl} />
            </View>
          ) : (
            <TouchableOpacity
              key={index}
              style={[
                LongPressCardStyle.repliedContainer,
                LongPressCardStyle.docContainer,
              ]}
              // onPress={() =>
              //   onAttachmentPress(item?.resourceUrl, item?.contentType)
              // }
              onPress={
                onAttachmentPress
                  ? () => onAttachmentPress()
                  : () => openAttachment(item?.resourceUrl, item?.contentType)
              }
              onLongPress={isLongPressCard ? null : onLongPress}
              activeOpacity={0.8}>
              <View style={LongPressCardStyle.docContentContainer}>
                {item?.contentType?.includes('pdf') && (
                  <FastImage
                    source={Pdf}
                    style={LongPressCardStyle.attachmentIcon}
                  />
                )}
                {item?.contentType?.includes('doc') && (
                  <FastImage
                    source={Doc}
                    style={LongPressCardStyle.attachmentIcon}
                  />
                )}
                <View>
                  <Text style={{color: 'black'}}>
                    {item?.title?.slice(0, 15) + '...'}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </>
    );
  },
);
export default Attachments;
