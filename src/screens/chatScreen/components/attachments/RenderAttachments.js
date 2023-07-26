import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Linking, Platform} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import {makeStyles as LongPressCardStyles} from '../longPressCard/LongPressCard-Styles';
import AudioRecordingPlayer from '../../../../components/AudioRecorderPlayer';
import {Csv, Doc, Pdf, Redirect} from '../../../../assests/images/attachments';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import ReactNativeBlobUtil from 'react-native-blob-util';
import {PdfPreview} from './PdfPreview';

const Attachments = React.memo(
  ({
    isLongPressCard = false,
    attachment,
    onImagePress = () => null,
    onAttachmentPress = () => null,
    onLongPress = () => null,
  }) => {
    const RenderAttachments = ({item, index}) => {
      const [localFilePath, setLocalFilePath] = useState(null);
      const [downloadProgress, setDownloadProgress] = useState(0);
      const [isDownloading, setIsDownloading] = useState(false);
      const {colors} = useTheme();
      const LongPressCardStyle = LongPressCardStyles(colors);

      useEffect(() => {
        if (item?.contentType?.includes('pdf')) {
          checkIfFileDownloaded(item?.resourceUrl);
        }
      }, []);

      const checkIfFileDownloaded = async url => {
        const filePath = getFilePath(url);
        const doesExist = await ReactNativeBlobUtil.fs.exists(filePath);
        if (doesExist) setLocalFilePath(filePath);
        setDownloadProgress(0);
        setIsDownloading(false);
      };

      function getFileNameFromURL(url) {
        const parts = url.split('/');
        const fileNameWithExtension = parts[parts.length - 1];
        return fileNameWithExtension;
      }

      function getFilePath(url) {
        const {
          dirs: {DownloadDir, DocumentDir},
        } = ReactNativeBlobUtil.fs;
        const directory_path = Platform.select({
          ios: DocumentDir,
          android: DownloadDir,
        });
        const filePath =
          directory_path + '/' + getFileNameFromURL(url) + '.pdf';
        return filePath;
      }

      function round(value, precision) {
        var multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
      }

      function downLoadFile(url, filePath) {
        setIsDownloading(true);
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
        ReactNativeBlobUtil.config(configOptions)
          .fetch('GET', url)
          .progress({interval: 250}, (received, total) => {
            setDownloadProgress(round((received / total) * 100, 0));
            // console.log(round((received / total) * 100, 0));
          })
          .then(res => {
            // console.log('The file saved to ', res.path());
            checkIfFileDownloaded(url);
          })
          .catch(async () => {
            console.log('in error', error);
            openFileInBrowser(url);
          });
      }

      async function openFileInBrowser(url) {
        if (await InAppBrowser.isAvailable()) {
          InAppBrowser?.open(url);
        } else {
          Linking.openURL(url);
        }
      }

      const openAttachment = async (url, contentType) => {
        if (contentType.includes('pdf')) {
          const filePath = getFilePath(url);
          const doesExist = await ReactNativeBlobUtil.fs.exists(filePath);
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
        } else {
          openFileInBrowser(url);
        }
      };

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
          onPress={
            onAttachmentPress
              ? () => onAttachmentPress()
              : () => {
                  if (isDownloading) return;
                  openAttachment(item?.resourceUrl, item?.contentType);
                }
          }
          onLongPress={isLongPressCard ? null : onLongPress}
          activeOpacity={0.8}>
          {localFilePath && <PdfPreview filePath={localFilePath} />}
          <View style={LongPressCardStyle.docContentContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 5,
              }}>
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
              {item?.contentType?.includes('csv') && (
                <FastImage
                  source={Csv}
                  style={LongPressCardStyle.attachmentIcon}
                />
              )}
              <View>
                <Text style={{color: 'black'}}>
                  {item?.title?.slice(0, 15) + '...'}
                </Text>
                {downloadProgress !== 0 && <Text>{downloadProgress}%</Text>}
              </View>
            </View>
            <View>
              <FastImage source={Redirect} style={{width: 27, height: 27}} />
            </View>
          </View>
        </TouchableOpacity>
      );
    };
    return (
      <>
        {attachment?.map((item, index) => {
          return <RenderAttachments item={item} index={index} key={index} />;
        })}
      </>
    );
  },
);
export default Attachments;
