import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Button,
  Linking,
} from 'react-native';
import React, {useState} from 'react';
import RenderHTML from 'react-native-render-html';
import {Checkbox, RadioButton} from 'react-native-paper';

const JSON = [
  {
    type: 'quill',
    content:
      '<h1>Hii Rudra</h1><p>My Name is Parakh Jain. Text from quilll</p>',
  },
  {
    type: 'plain_text',
    content: 'Plain Text',
  },
  {
    type: 'Button_with_url',
    content: 'Url button',
    url: 'https://google.com',
  },
  {
    type: 'Button',
    content: 'Normal Button',
  },
  {
    type: 'checkbox',
    content: 'hello',
  },
  {
    type: 'checkbox',
    content: 'hello',
  },
  {
    type: 'radioBtn',
    content: 'hello',
    values: ['first', 'second', 'third'],
  },
  {
    type: 'section',
    content: 'hello',
    elements: [
      {
        type: 'Button',
        content: 'Normal Button',
      },
      {
        type: 'Button',
        content: 'Normal Button',
      },
      {
        type: 'Button',
        content: 'Normal Button',
      },
    ],
  },
];

const Home = () => {
  const [data, setData] = useState({});
  const [value, setValue] = React.useState('');
  const handleCheckboxToggle = index => {
    setData(prevData => ({
      ...prevData,
      [index]: !prevData[index],
    }));
  };

  const renderComponent = (item, index) => {
    const {width} = useWindowDimensions();

    switch (item.type) {
      case 'quill':
        return (
          <RenderHTML
            source={{
              html: item?.content,
            }}
            contentWidth={width}
          />
        );
      case 'plain_text':
        return <Text key={index}>{item.content}</Text>;
      case 'Button_with_url':
        return (
          <Button
            title={item?.content}
            onPress={() => Linking.openURL(item?.url)}
          />
        );
      case 'Button':
        return <Button title={item?.content} />;

      case 'Section':
        return item?.elements?.map((element, elementIndex) =>
          renderComponent(element, elementIndex),
        );

      case 'checkbox':
        if (typeof data[index] === 'undefined') {
          setData(prevData => ({
            ...prevData,
            [index]: false,
          }));
        }

        return (
          <View
            style={{flexDirection: 'row', alignItems: 'center'}}
            key={index}>
            <Text>{item.content}</Text>
            <Checkbox
              status={data[index] ? 'checked' : 'unchecked'}
              onPress={() => handleCheckboxToggle(index)}
            />
          </View>
        );
      case 'radioBtn':
        return (
          <RadioButton.Group
            // onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View>
              <Text>First</Text>
              {item?.values?.map(item => {
                <RadioButton value={item} />;
              })}
            </View>
          </RadioButton.Group>
        );
      default:
        return null;
    }
  };
  return (
    <View style={{marginHorizontal: 20}}>
      {JSON.map((item, index) => renderComponent(item, index))}
    </View>
  );
};

export default Home;
