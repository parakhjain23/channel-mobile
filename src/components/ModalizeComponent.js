import {View, Text} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {Modalize} from 'react-native-modalize';
import {useDispatch} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const ModalizeComponent = ({children}) => {
  console.log(children, '-=-=-=-');
  const modalizeRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({type: 'SET_REF', ref: modalizeRef});
  });
  return (
    <GestureHandlerRootView>
      <Modalize ref={modalizeRef}>
        <View>
          <Text>hello</Text>
        </View>
      </Modalize>
    </GestureHandlerRootView>
  );
};

export default ModalizeComponent;
