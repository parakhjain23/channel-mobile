import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import {pickDocument, launchCameraForPhoto, launchGallery} from './AttachmentPickerV2';
import {listStyles} from './AttachmentStyles';
import { attachmentObject } from '../../../../types/ChatsReducerType';

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
interface AttachmentOptionsModalV2Props {
  AttachmentObject: attachmentObject;
}

const AttachmentOptionsV2 : React.FC<AttachmentOptionsModalV2Props> = React.memo(({AttachmentObject}) => {
  const {modalizeRef, setAttachment, setAttachmentLoading} = AttachmentObject;
  const {colors} = useTheme();
  const listStyle = listStyles(colors);

  return (
    <View style={{justifyContent: 'center'}}>
      <View style={{borderRadius: 20}}>
        <AttachmentTile
          onPress={() => {
            pickDocument(setAttachment, setAttachmentLoading);
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
            launchCameraForPhoto(setAttachment, setAttachmentLoading);
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
            launchGallery(setAttachment, setAttachmentLoading);
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

export default AttachmentOptionsV2;
