import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Animated} from 'react-native';

const MyComponent = () => {
  const [showTopComponent, setShowTopComponent] = useState(false);
  const scrollY = new Animated.Value(0);
  const scrollThreshold = -50; // Adjust the threshold value as needed

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    console.log(offsetY, '=-=-');
    if (offsetY < scrollThreshold) {
      console.log('hahah');
      setShowTopComponent(true);
    } else {
      setShowTopComponent(false);
    }

    scrollY.setValue(offsetY);
  };

  const renderTopComponent = () => {
    if (showTopComponent) {
      return (
        <View style={styles.topComponent}>
          {/* Content of the top component */}
          <Text>Top Component</Text>
        </View>
      );
    }
    return null;
  };

  const data = [
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
    {name: 'hello'},
  ];

  const renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderTopComponent()}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topComponent: {
    height: 100,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    marginBottom: 5,
  },
});

export default MyComponent;
