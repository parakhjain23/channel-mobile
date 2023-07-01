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
import {useTheme} from '@react-navigation/native';

const CredHomeScreen = () => {
  const modalizeRef = useRef(null);
  const colors = useTheme();
  const openModal = () => {
    modalizeRef.current?.open();
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={styles.bannerText}>Explore</Text>
        </View>
        {/* <TouchableOpacity style={styles.banner} onPress={openModal}> */}
        {/* </TouchableOpacity> */}
      </View>
      <Text style={{color: 'red'}}>hello</Text>
      <Modalize
        ref={modalizeRef}
        alwaysOpen={Number(Dimensions.get('screen').height * 0.6)}
        snapPoint={300}
        withOverlay={false}
        modalStyle={[styles.modal]}
        handleStyle={styles.handle}
        scrollViewProps={{scrollEnabled: false}}
        handlePosition="outside">
        <ScrollView>
          <View style={styles.modalContent}>
            <ChannelsScreen />
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
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modal: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  handle: {
    backgroundColor: '#CCCCCC',
    width: 40,
    height: 3,
    borderRadius: 3,
    // bottom: 0,
    // top: 0,
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
