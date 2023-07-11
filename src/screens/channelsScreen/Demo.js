import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  PanResponder,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import RecentChannelsList from './components/RecentChannelsList';
import {Modalize} from 'react-native-modalize';
import Slider from '../../components/OrgSlider';
import SearchBox from '../../components/searchBox';

const Demo = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollY = useRef(new Animated.Value(0));
  const {height} = Dimensions.get('window');
  const offset = height * 0.12;
  const [refreshing, setRefreshing] = useState(false);
  const [searchValue, setsearchValue] = useState('');
  const changeText = value => {
    setsearchValue(value);
  };

  const onScroll = useCallback(
    Animated.event([{nativeEvent: {contentOffset: {y: scrollY?.current}}}], {
      useNativeDriver: true,
      listener: event => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setIsScrolling(offsetY > height / 4);
      },
    }),
    [scrollY?.current, height, setIsScrolling],
  );
  const textInputRef = useRef(null);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={{
          uri: 'https://w.forfun.com/fetch/b0/b0afce86f6e4571b6eb5830d331198be.jpeg',
        }}
        style={{flex: 1}}>
        <View style={{flex: 1}}>
          <RecentChannelsList
            onScroll={onScroll}
            refreshing={false}
            onRefresh={false}
            setChatDetailsForTab={false}
          />
        </View>
        <View style={{position: 'absolute', bottom: 0}}>
          <Slider />
        </View>
        {isScrolling && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              zIndex: 1,
              opacity: isScrolling ? 1 : 0,
            }}>
            <SearchBox
              textInputRef={textInputRef}
              searchValue={searchValue}
              changeText={changeText}
              isSearchFocus={false}
            />
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Demo;
