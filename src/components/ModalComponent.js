import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {
  GestureHandlerRootView,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import {Modalize} from 'react-native-modalize';
import {useDispatch, useSelector} from 'react-redux';

const ModalComponent = ({modalizeRef, children}) => {
  console.log('in modal', children);
  const dispatch = useDispatch();
  const modalstate = useSelector(state => state.modalReducer);
  useEffect(() => {
    if (modalstate?.modalRef == undefined) {
      dispatch({type: 'SET_REF', modalRef: modalizeRef});
    }
  }, []);
  return (
    <GestureHandlerRootView>
      <Modalize
        ref={modalizeRef}
        modalStyle={{
          // flex: 1,
          marginTop: '20%',
        }}
        handlePosition="outside">
        <View>
          <Text>hello i'm modalize component.</Text>
        </View>
      </Modalize>
    </GestureHandlerRootView>
  );
};

export default ModalComponent;
