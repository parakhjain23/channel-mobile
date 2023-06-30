import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Modal,
  PanResponder,
  Animated,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import ChannelsScreen from '../channelsScreen/ChannelsScreen';
import {Modalize} from 'react-native-modalize';

const CredHomeScreen = () => {
  const modalizeRef = useRef(null);

  const openModal = () => {
    modalizeRef.current?.open();
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Banner</Text>
        </View>
        {/* <TouchableOpacity style={styles.banner} onPress={openModal}> */}
        {/* </TouchableOpacity> */}
      </View>
      <Modalize
        ref={modalizeRef}
        alwaysOpen={Number(Dimensions.get('screen').height * 0.6)}
        snapPoint={300}
        modalStyle={[styles.modal]}
        handleStyle={styles.handle}
        // scrollViewProps={{scrollEnabled: false}}
        handlePosition="outside">
        <ScrollView>
          <View style={styles.modalContent}>
            <ChannelsScreen />
            <Text style={styles.modalText}>Modal Content</Text>
          </View>
        </ScrollView>
      </Modalize>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  banner: {
    height: '50%',
    backgroundColor: 'rgba(0,0,256,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  modal: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    paddingVertical: 20,
  },
  handle: {
    backgroundColor: '#CCCCCC',
    width: 40,
    height: 6,
    borderRadius: 3,
  },
  modalHeader: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContent: {},
  modalText: {
    fontSize: 16,
  },
});

export default CredHomeScreen;
