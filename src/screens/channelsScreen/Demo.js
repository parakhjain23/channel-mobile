import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  PanResponder,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import RecentChannelsList from './components/RecentChannelsList';
import {Modalize} from 'react-native-modalize';
import Slider from '../../components/OrgSlider';

const Demo = () => {
  const modalizeRef = useRef();
  useEffect(() => {
    modalizeRef?.current?.open();
  }, []);

  const dmUsers = [
    {
      name: 'Rudraksh',
      url: 'https://ca.slack-edge.com/T02RECUCG-U04HETS2NLS-95caaaf08199-512',
    },
    {
      name: 'Parakh',
      url: 'https://ca.slack-edge.com/T02RECUCG-U04HETRSTB4-d2fe3afae5c0-192',
    },
    {
      name: 'Goutam',
      url: 'https://ca.slack-edge.com/T02RECUCG-U04HZKV3TFB-c4ee6a3c9faf-512',
    },
    {
      name: 'Pushpendra',
      url: 'https://ca.slack-edge.com/T02RECUCG-U02RECUCJ-30e6e9bfea93-512',
    },
    {
      name: 'Harsh',
      url: 'https://ca.slack-edge.com/T02RECUCG-U04FF0LNGPP-5a8805c54388-512',
    },
    {
      name: 'Shruti',
      url: 'https://ca.slack-edge.com/T02RECUCG-U028BEVJ3NZ-0af2a4dec770-192',
    },
    {
      name: 'All Dms',
      url: 'https://icon-library.com/images/user-icon-jpg/user-icon-jpg-28.jpg',
    },
  ];
  const orgs = [{name: 'MSG91'}, {name: 'WALKOVER'}, {name: 'SPACE'}];
  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={{
          uri: 'https://w.forfun.com/fetch/b0/b0afce86f6e4571b6eb5830d331198be.jpeg',
        }}
        style={{flex: 1}}>
        <ScrollView>
          <View style={{marginTop: 30}}>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                // backgroundColor: 'blue',
              }}>
              {dmUsers?.map((user, index) => (
                <View
                  key={index}
                  style={{
                    // width: '50%', // Each item takes 50% width to display two items per line
                    padding: 5,
                    alignItems: 'center',
                    // backgroundColor: 'red',
                  }}>
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      overflow: 'hidden',
                    }}>
                    <Image
                      source={{uri: user?.url}}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                    />
                  </View>
                  <Text style={{marginTop: 10, color: 'white'}}>
                    {user?.name}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{flex: 1}}>
            <RecentChannelsList
              onScroll={''}
              refreshing={''}
              onRefresh={''}
              setChatDetailsForTab={''}
            />
          </View>
        </ScrollView>
        <View style={{position: 'absolute', bottom: 0}}>
          <Slider />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Demo;
