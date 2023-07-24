import {View, Modal, Pressable} from 'react-native';
import React, {useCallback} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ListFooterComponent from '../../../components/ListFooterComponent';

const ImageViewerComponent = ({url, setSelectedImage}) => {
  const handleModalClose = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const renderImageviewerHeader = () => (
    <View
      style={{
        // height: '7%',
        marginTop: 18,
        position: 'absolute',
        zIndex: 99,
      }}>
      <Pressable onPress={handleModalClose} style={{padding: 10}}>
        <AntDesign name={'close'} size={25} color={'#ffffff'} />
      </Pressable>
    </View>
  );
  return (
    <Modal visible={true} transparent={true} onRequestClose={handleModalClose}>
      <ImageViewer
        imageUrls={[
          {
            url: url,
            freeHeight: true,
            freeWidth: true,
          },
        ]}
        enableSwipeDown={true}
        onSwipeDown={handleModalClose}
        renderHeader={renderImageviewerHeader}
        loadingRender={() => <ListFooterComponent />}
      />
    </Modal>
  );
};

export default ImageViewerComponent;
