import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useTheme} from '@react-navigation/native';
import {makeStyles as LongPressCardStyles} from '../longPressCard/LongPressCard-Styles';
import AudioRecordingPlayer from '../../../../components/AudioRecorderPlayer';
import {Doc, Pdf} from '../../../../assests/images/attachments';
import InAppBrowser from 'react-native-inappbrowser-reborn';

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

    const openLink = async url => {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser?.open(url);
      } else {
        Linking.openURL(url);
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
              onPress={() =>
                onAttachmentPress(item?.resourceUrl, item?.contentType)
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
