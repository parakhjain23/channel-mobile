import {
  View,
  Text,
  useWindowDimensions,
  Button,
  Linking,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import RenderHTML from 'react-native-render-html';
import {Checkbox, RadioButton, TextInput} from 'react-native-paper';

let JSON = [
  // {
  //   type: 'Section',
  //   elements: [
  //     {
  //       type: 'Checkbox',
  //       value: 'Protein',
  //       options: [
  //         {
  //           type: 'plain_text',
  //           value: 'first',
  //         },
  //         {
  //           type: 'plain_text',
  //           value: 'Second',
  //         },
  //       ],
  //       action_id: 123,
  //     },
  //   ],
  // },
  // {
  //   type: 'Checkbox',
  //   value: 'Protein',
  //   options: [
  //     {
  //       type: 'plain_text',
  //       value: 'first',
  //     },
  //     {
  //       type: 'plain_text',
  //       value: 'Second',
  //     },
  //   ],
  //   action_id: 123,
  // },
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
    type: 'Button',
    value: 'Submit',
  },
  {
    type: 'RadioButton',
    value: 'Protein',
    options: [
      {
        type: 'plain_text',
        value: 'Protein',
      },
      {
        type: 'plain_text',
        value: 'Carbs',
      },
    ],
    action_id: 345,
  },
  {
    type: 'Section',
    elements: [
      {
        type: 'RadioButton',
        value: 'Protein',
        options: [
          {
            type: 'plain_text',
            value: 'Protein',
          },
          {
            type: 'plain_text',
            value: 'Carbs',
          },
        ],
        action_id: 11,
      },
    ],
  },
  {
    type: 'Card',
    elements: [
      {
        type: 'Section',
        elements: [
          {
            type: 'RadioButton',
            value: 'Protein',
            options: [
              {
                type: 'plain_text',
                value: 'Protein',
              },
              {
                type: 'plain_text',
                value: 'Carbs',
              },
            ],
            action_id: 567,
          },
        ],
      },
      {
        type: 'Button',
        value: 'hello',
      },
    ],
  },
  {
    type: 'Input_Box',
    value: 'Name',
    label: 'Name',
    action_id: 1111,
  },
  {
    type: 'Input_Box',
    value: 'Name',
    label: 'Name',
    action_id: 1010,
  },
  {
    type: 'Input_Box',
    value: 'Name',
    label: 'Name',
    action_id: 10111,
  },
];

const Home = () => {
  const [data, setData] = useState({});
  const [value, setValue] = React.useState({});

  const handleCheckboxToggle = (action_id, name) => {
    // setData(prevData => ({
    //   ...prevData,
    //   [currentElementId]: !prevData[currentElementId],
    // }));

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
  console.log(data, '=-=-');
  console.log(value, '=-=-');

  const onChange = (action_id, text) => {
    console.log(text, 'taljdl;jal;kjfl;kdj');
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
              title={item?.value}
              onPress={() => console.log(JSON[0]?.options)}
            />
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

      case 'Input_Box':
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
          <View
            style={{
              // flexDirection: 'row',
              justifyContent: 'center',
              // alignItems: 'center',
              padding: 20,
              backgroundColor: 'white', // Change background color if desired
              // flexWrap: 'wrap',
              borderRadius: 10,
              shadowColor: 'black',
              shadowRadius: 5,
              shadowOpacity: 0.2,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              elevation: 5,
            }}>
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
