import React from 'react';
import {View, StyleSheet} from 'react-native';

const Divider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA', // You can change the color to suit your design
    marginVertical: 10,
  },
});

export default Divider;
