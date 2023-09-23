import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Animated} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {pickDocument} from '../DocumentPicker';
import {launchCameraForPhoto, launchGallery} from '../ImagePicker';
import {listStyles} from './AttachmentStyles';

const AttachmentTile = React.memo(
  ({onPress, iconName, iconSize, tileText, listStyles}) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={listStyles?.attachmentTile}
        activeOpacity={0.8}>
        <MaterialIcons
          name={iconName}
          size={iconSize}
          style={listStyles.attachIcon}
        />
        <Text style={listStyles?.text}>{tileText}</Text>
      </TouchableOpacity>
    );
  },
);

const AttachmentOptions = React.memo(({AttachmentObject}) => {
  const {modalizeRef, accessToken, setAttachment, setAttachmentLoading} =
    AttachmentObject;
  const {colors} = useTheme();
  const listStyle = listStyles(colors);

  return (
    <View style={{justifyContent: 'center'}}>
      <View style={{borderRadius: 20}}>
        <AttachmentTile
          onPress={() => {
            pickDocument(setAttachment, accessToken, setAttachmentLoading);
            modalizeRef?.current?.close();
            // setShowOptions(false);
          }}
          iconName="attach-file"
          iconSize={20}
          tileText="Browse files from your device"
          listStyles={listStyle}
        />
        <AttachmentTile
          onPress={() => {
            launchCameraForPhoto(
              accessToken,
              setAttachment,
              setAttachmentLoading,
            );
            modalizeRef?.current?.close();
            // setShowOptions(false);
          }}
          iconName="camera-alt"
          iconSize={20}
          tileText="Snap with camera"
          listStyles={listStyle}
        />
        <AttachmentTile
          onPress={() => {
            launchGallery(accessToken, setAttachment, setAttachmentLoading);
            modalizeRef?.current?.close();
            // setShowOptions(false);
          }}
          iconName="image"
          iconSize={20}
          tileText="Pick from gallery"
          listStyles={listStyle}
        />
      </View>
    </View>
  );
});

export default AttachmentOptions;
