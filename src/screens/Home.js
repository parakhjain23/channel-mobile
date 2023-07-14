import {
  View,
  Text,
  useWindowDimensions,
  Button,
  Linking,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import RenderHTML from 'react-native-render-html';
import {Checkbox, RadioButton, TextInput} from 'react-native-paper';

let JSON = [
  {
    type: 'Checkbox',
    value: 'Protein',
    options: [
      {
        type: 'plain_text',
        value: 'first',
      },
      {
        type: 'plain_text',
        value: 'Second',
      },
    ],
    action_id: 123,
  },
  {
    type: 'form',
    action_id: 'form',
    elements: [
      {
        type: 'Image',
        url: 'https://photos.prnewswire.com/prnfull/20150402/10119680',
        width: 90,
      },
      {
        type: 'input',
        value: 'First Name',
        label: 'Name',
        placeholder: 'First Name',
        action_id: 'fname',
      },
      {
        type: 'input',
        value: 'Last Name',
        label: 'Name',
        placeholder: 'Last Name',
        action_id: 'lname',
      },
      {
        type: 'Section',
        elements: [
          {
            type: 'Checkbox',
            value: 'Protein',
            options: [
              {
                type: 'plain_text',
                value: 'first',
              },
              {
                type: 'plain_text',
                value: 'Second',
              },
            ],
            action_id: 123,
          },
        ],
      },
      {
        type: 'Button',
        value: 'Submit',
        action_id: 'button',
      },
    ],
  },
  // {
  //   type: 'Card',
  //   elements: [
  //     {
  //       type: 'Section',
  //       elements: [
  //         {
  //           type: 'RadioButton',
  //           value: 'Protein',
  //           options: [
  //             {
  //               type: 'plain_text',
  //               value: 'Protein',
  //             },
  //             {
  //               type: 'plain_text',
  //               value: 'Carbs',
  //             },
  //           ],
  //           action_id: 567,
  //         },
  //       ],
  //     },
  //     {
  //       type: 'Button',
  //       value: 'Submit',
  //     },
  //   ],
  // },
];

const Home = () => {
  const [data, setData] = useState({});
  const [value, setValue] = React.useState({});

  const handleCheckboxToggle = (action_id, name) => {
    setData(prevData => ({
      ...prevData,
      [action_id]: {
        ...prevData[action_id],
        [name]: !prevData[action_id]?.[name] || false,
      },
    }));
  };

  const handleRadioButtonToggle = (action_id, name) => {
    setValue(prevData => ({
      ...prevData,
      [action_id]: name,
    }));
  };

  const onChange = (action_id, text) => {
    setData(prevData => ({
      ...prevData,
      [action_id]: text,
    }));
  };
  const renderComponent = (item, index) => {
    const {width} = useWindowDimensions();
    switch (item.type) {
      case 'Quill':
        return (
          <RenderHTML
            source={{
              html: item?.value,
            }}
            valueWidth={width}
          />
        );

      case 'plain_text':
        return (
          <View style={{flexShrink: 1, minWidth: 0}}>
            <Text key={index}>{item?.value}</Text>
          </View>
        );

      case 'Button_with_url':
        return (
          <Button
            title={item?.value}
            onPress={() => Linking.openURL(item?.url)}
          />
        );

      case 'Button':
        return (
          <View style={{flexShrink: 1}}>
            <Button
              title={item?.value || 'Submit'}
              onPress={() => console.log(JSON[0]?.options)}
            />
          </View>
        );
      case 'form':
        return (
          <View style={styles.cardContainer}>
            {item?.elements?.map((element, index) =>
              renderComponent(element, index),
            )}
          </View>
        );

      case 'Section':
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              // flexWrap: 'wrap',
            }}>
            {item?.elements?.map((element, index) =>
              renderComponent(element, index),
            )}
          </View>
        );

      case 'Checkbox':
        if (typeof data[item?.action_id] === 'undefined') {
          setData(prevData => ({
            ...prevData,
            [item.action_id]: {},
          }));
        }
        return item?.options?.map((element, elementIndex) => {
          return (
            <TouchableOpacity
              onPress={() =>
                handleCheckboxToggle(item?.action_id, element?.value)
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
              }}
              key={elementIndex}>
              <Checkbox
                status={
                  data[item?.action_id]?.[element?.value]
                    ? 'checked'
                    : 'unchecked'
                }
              />
              <View>{renderComponent(element, index)}</View>
            </TouchableOpacity>
          );
        });

      case 'RadioButton':
        return (
          <RadioButton.Group
            onValueChange={value =>
              handleRadioButtonToggle(item?.action_id, value)
            }
            // onValueChange={newValue => setValue(newValue)}
            value={value[item?.action_id]}>
            <View>
              {item?.options?.map(element => {
                return (
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton value={element?.value} />
                    <Text>{element?.value}</Text>
                  </View>
                );
              })}
            </View>
          </RadioButton.Group>
        );

      case 'Image':
        return (
          <Image
            source={{
              uri: item?.url,
            }}
            style={{
              height: item?.height || 50,
              width: item?.width || 50,
              marginRight: 8,
              borderRadius: item?.radius || 0,
            }}
          />
        );

      case 'input':
        return (
          <TextInput
            mode="outlined"
            label={item?.label || ''}
            placeholder={item?.placeholder || ''}
            onChangeText={text => onChange(item?.action_id, text)}
          />
        );

      case 'Card':
        return (
          <View style={styles.cardContainer}>
            {item?.elements?.map((element, index) =>
              renderComponent(element, index),
            )}
          </View>
        );

      default:
        return null;
    }
  };
  return (
    <ScrollView>
      <View style={{marginHorizontal: 20}}>
        {JSON.map((item, index) => renderComponent(item, index, `[${index}]`))}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  cardContainer: {
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white', // Change background color if desired
    // flexWrap: 'wrap',
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 5,
  },
});
