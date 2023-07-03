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
  Image,
} from 'react-native';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import ChannelsScreen from '../channelsScreen/ChannelsScreen';
import {Modalize} from 'react-native-modalize';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import {IMAGE_BASE_URL} from '../../constants/Constants';

const CredHomeScreen = () => {
  const modalizeRef = useRef(null);
  const [position, setPosition] = useState(false);

  const userInfoState = useSelector(state => state.userInfoReducer);
  const onPositionChange = position => {
    console.log(position, '=-=-=-');
    setPosition(position === 'top');
  };
  const onLayout = e => {
    console.log(e);
    console.log(modalizeRef?.current, 'layout');
  };
  const DATA = [
    {index: 1, name: 'Apps'},
    {index: 2, name: 'All\nMembers'},
    {index: 3, name: 'All\nChannels'},
  ];
  const ACTIONS = [
    {index: 1, name: 'New Channel'},
    {index: 2, name: 'Search'},
  ];
  const onscroll = event => {
    console.log(event, '=-=-=');
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={[styles.banner]}>
          <View
            style={{
              // flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'flex-start',
              paddingBottom: 20,
            }}>
            <Image
              source={require('../../assests/images/appIcon/icon48size.png')}
              style={{width: 35, height: 35}}
            />
            <Text style={styles.bannerText}>explore</Text>
            <FastImage
              source={{
                uri: userInfoState?.user?.avatarKey
                  ? `${IMAGE_BASE_URL}${userInfoState?.user?.avatarKey}`
                  : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
              }}
              style={{width: 35, height: 35, borderRadius: 50}}
            />
          </View>
          <ScrollView horizontal={true} style={{maxHeight: 140}}>
            {DATA?.map(item => {
              return (
                <View
                  style={{
                    width: 110,
                    height: 110,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#77cdef',
                    borderRadius: 15,
                    margin: 10,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: 'white',
                  }}>
                  <Text style={{textAlign: 'center', color: 'black'}}>
                    {item?.name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            {ACTIONS.map(item => {
              return (
                <View
                  style={{
                    width: 120,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#77cdef',
                    borderRadius: 10,
                    marginHorizontal: 15,
                    borderWidth: StyleSheet.hairlineWidth,
                    borderColor: 'white',
                  }}>
                  <Text style={{textAlign: 'center', color: 'black'}}>
                    {item?.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <Modalize
        // ref={modalizeRef}
        alwaysOpen={Number(Dimensions.get('screen').height * 0.5)}
        snapPoint={300}
        withOverlay={false}
        onLayout={onLayout}
        onPositionChange={onPositionChange}
        modalStyle={[styles.modal]}
        handleStyle={styles.handle}
        avoidKeyboardLikeIOS={true}
        scrollViewProps={{scrollEnabled: position}}
        closeOnOverlayTap={false}
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
    backgroundColor: 'rgba(0,0,0,1)',
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  bannerText: {
    fontSize: 12,
    fontWeight: 'bold',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#77cdef',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#474747',
  },
  modal: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    marginTop: 0,
  },
  handle: {
    backgroundColor: '#CCCCCC',
    width: 40,
    height: 2,
    borderRadius: 3,
    display: 'none',
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
