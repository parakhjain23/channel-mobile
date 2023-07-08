import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');

const Slider = () => {
  const images = [
    {
      img: 'https://ca.slack-edge.com/T02RECUCG-U04HETS2NLS-95caaaf08199-512',
      mode: 'WALKOVER',
      det: '',
    },
    {
      img: 'https://ca.slack-edge.com/T02RECUCG-U04HETS2NLS-95caaaf08199-512',
      mode: 'CHANNEL',
      det: '',
    },
    {
      img: 'https://ca.slack-edge.com/T02RECUCG-U04HETS2NLS-95caaaf08199-512',
      mode: 'MSG91',
      det: '',
    },
  ];
  const [active, setActive] = useState(0);
  const [timer, setTimer] = useState(null);
  let scrollRef = useRef(null);

  const change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active && !timer) {
      setActive(slide);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <Text
            key={index}
            style={
              index === active ? styles.pagingActiveText : styles.pagingText
            }>
            ●
          </Text>
        ))}
      </View>
      <ScrollView
        pagingEnabled
        ref={scrollRef}
        horizontal
        onScroll={change}
        onTouchMove={() => {
          clearInterval(timer);
          setTimer(null);
        }}
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{flex: 1}}
      >
        {images.map((image, index) => (
          <View
            style={{
              width: Dimensions?.get('screen').width,
              // height: 200,
              alignItems: 'center',
              paddingVertical: 20,
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 22, color: '#fff', fontWeight: 'bold'}}>
              {image.mode}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                paddingHorizontal: 20,
                fontSize: 16,
                color: '#DBE9FF',
              }}>
              {image.det}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backfaceVisibility: true,
    // backgroundColor: 'black',
  },
  slider: {
    // alignItems: 'center',
    // paddingVertical: 50,
    // justifyContent: 'space-between',
  },

  image: {
    width: width,
    height: height * 0.25,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  pagination: {
    flexDirection: 'row',
    // position: 'absolute',
    bottom: -10,
    alignSelf: 'center',
  },
  pagingText: {
    color: '#D9D9D9',
    margin: 3,
  },
  pagingActiveText: {
    color: '#3738BF',
    margin: 3,
  },
  mode: {
    flexDirection: 'row',
    backgroundColor: 'pink',
    position: 'absolute',
    bottom: 30,
  },
  modeActiveText: {
    color: '#fff',
    fontSize: 20,
  },
});
export default Slider;
