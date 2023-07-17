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

import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
} from 'victory-native';
import {Checkbox, RadioButton, TextInput} from 'react-native-paper';

const JSON = [
  // {
  //   type: 'Quill',
  //   content:
  //     '<h1>Hii Rudra</h1><p>My Name is Parakh Jain. Text from Quilll</p>',
  // },
  // {
  //   type: 'Plain_Text',
  //   content: 'Plain Text',
  // },
  // {
  //   type: 'Button_with_url',
  //   content: 'Url button',
  //   url: 'https://google.com',
  // },
  // {
  //   type: 'Button',
  //   content: 'Normal Button',
  // },
  // {
  //   type: 'Card',
  //   elements: [
  //     {
  //       type: 'Section',
  //       content: 'Normal Button',
  //       elements: [
  //         {
  //           type: 'Plain_Text',
  //           content:
  //             'hello A boolean that indicates whether the input element may be empty when a user submits the modal. Defaults toA boolean that indicates whether the input element may be empty when a user submits the modal. Defaults to',
  //         },
  //         {
  //           type: 'Image',
  //           url: 'https://images.everydayhealth.com/homepage/health-topics-2.jpg?w=720',
  //           height: 90,
  //           width: 50,
  //         },
  //       ],
  //     },
  //     {
  //       type: 'Section',
  //       content: 'hello',
  //       elements: [
  //         {
  //           type: 'Button',
  //           content: 'Normal Button',
  //         },
  //         {
  //           type: 'Button',
  //           content: 'Normal Button',
  //         },
  //       ],
  //     },
  //     {
  //       type: 'plain_text',
  //       content: 'this buttons are in section block',
  //     },
  //   ],
  // },
  // {
  //   type: 'barGraph',
  //   values: [
  //     {x: 'MSG90', y: '5', label: '100cr'},
  //     {x: 'MSG91', y: '15', label: '100cr'},
  //     {x: 'MSG92', y: '5', label: '100cr'},
  //     {x: 'MSG93', y: '25', label: '100cr'},
  //     {x: 'MSG94', y: '10', label: '100cr'},
  //     {x: 'MSG95', y: '5', label: '100cr'},
  //     {x: 'MSG96', y: '5', label: '100cr'},
  //     {x: 'MSG97', y: '5', label: '100cr'},
  //   ],
  //   categories: {
  //     x: ['MSG90', 'MSG91', 'MSG92', 'MSG93', 'MSG94'],
  //     y: ['5', '10', '15', '20', '25'],
  //   },
  //   xAxisLabel: 'revenue in Cr.',
  //   yAxisLabel: 'time in Years',
  // },
  // {
  //   type: 'pieChart',
  //   values: [
  //     {x: 'MSG91', y: 30},
  //     {x: 'Gidh', y: 20},
  //     {x: 'SPACE', y: 15},
  //     {x: 'halfKg', y: 35},
  //   ],
  //   chatTitile: 'year 2023 contributions',
  // },
  // {
  //   type: 'lineGraph',
  //   values: [
  //     {x: 1, y: 2},
  //     {x: 2, y: 3},
  //     {x: 3, y: 5},
  //     {x: 4, y: 4},
  //     {x: 5, y: 7},
  //   ],
  // },
  {
    type: 'Card',
    elements: [
      {
        type: 'Image',
        url: 'https://pipedream.com/s.v0/app_1xoha0/logo/orig',
        height: 50,
        width: 50,
        radius: 10,
      },
      {
        type: 'Input_Box',
        placeholder: 'First Name',
        label: 'Name',
      },
      {
        type: 'Input_Box',
        placeholder: 'Last Name',
        label: 'Name',
      },
      {
        type: 'Input_Box',
        placeholder: 'Age',
        label: 'Age',
      },
      {
        type: 'Input_Box',
        placeholder: 'What are your expectations.',
        label: 'Ex.',
      },
      {
        type: 'Button',
        content: 'Submit',
      },
    ],
  },
  // {
  //   type: 'Checkbox',
  //   content: 'hello',
  // },
  // {
  //   type: 'Checkbox',
  //   content: 'hello',
  // },
  // {
  //   type: 'RadioButton',
  //   content: 'hello',
  //   values: ['first', 'second', 'third'],
  // },

  // {
  //   type: 'Image',
  //   url: 'https://png.pngtree.com/element_our/20190530/ourmid/pngtree-correct-icon-image_1267804.jpg',
  //   height: 50,
  //   width: 50,
  // },
  // {
  //   type: 'Plain_Text',
  //   content:
  //     'hello A boolean that indicates whether the input element may be empty when a user submits the modal. Defaults toA boolean that indicates whether the input element may be empty when a user submits the modal. Defaults to',
  // },
  // {
  //   type: 'Section',
  //   content: 'hello',
  //   elements: [
  //     {
  //       type: 'Button',
  //       content: 'Normal Button',
  //     },
  //     {
  //       type: 'Button',
  //       content: 'Normal Button',
  //     },
  //   ],
  // },
  // {
  //   type: 'Input_Box',
  //   placeholder: 'hello',
  //   label: 'hello',
  // },
  // {
  //   type: 'Card',
  //   elements: [
  //     {
  //       type: 'Section',
  //       elements: [
  //         {
  //           type: 'Image',
  //           url: 'https://images.everydayhealth.com/homepage/health-topics-2.jpg?w=720',
  //           height: 90,
  //           width: '100%',
  //         },
  //         {
  //           type: 'Image',
  //           url: 'https://png.pngtree.com/element_our/20190530/ourmid/pngtree-correct-icon-image_1267804.jpg',
  //           height: 50,
  //           width: 50,
  //         },
  //       ],
  //     },
  //     {
  //       type: 'Plain_Text',
  //       content:
  //         'Health is wealth" emphasizes the value of good health for a fulfilling life. As for protein vs. carbs, both macronutrients are important for different bodily functions and should be balanced in a healthy diet.',
  //     },
  //     {
  //       type: 'Section',
  //       elements: [
  //         {
  //           type: 'Checkbox',
  //           content: 'Protein',
  //         },
  //         {
  //           type: 'Checkbox',
  //           content: 'Carbs',
  //         },
  //       ],
  //     },
  //     {
  //       type: 'Button',
  //       content: 'Health Is Wealth',
  //     },
  //   ],
  // },
];

const Home = () => {
  const [data, setData] = useState(JSON);
  const [value, setValue] = React.useState('');
  console.log(data, '=-=-');

  const handleCheckboxToggle = currentElementId => {
    setData(prevData => ({
      ...prevData,
      [currentElementId]: !prevData[currentElementId],
    }));
  };

  const renderComponent = (item, index, currentElementId) => {
    const {width} = useWindowDimensions();
    console.log(item);
    switch (item.type) {
      case 'Quill':
        return (
          <RenderHTML
            source={{
              html: item?.content,
            }}
            contentWidth={width}
          />
        );
      case 'Plain_Text':
        return (
          <View style={{flexShrink: 1, minWidth: 0}}>
            <Text key={index}>{item?.content}</Text>
          </View>
        );
      case 'Button_with_url':
        return (
          <Button
            title={item?.content}
            onPress={() => Linking.openURL(item?.url)}
          />
        );
      case 'Button':
        return (
          <View style={{flexShrink: 1}}>
            <Button title={item?.content} />
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
              renderComponent(
                element,
                index,
                currentElementId + '.elements' + `[${index}]`,
              ),
            )}
          </View>
        );

      case 'Checkbox':
        if (typeof data[currentElementId] === 'undefined') {
          setData(prevData => ({
            ...prevData,
            [currentElementId]: false,
          }));
        }

        return (
          <TouchableOpacity
            onPress={() => handleCheckboxToggle(currentElementId)}
            style={{flexDirection: 'row', alignItems: 'center'}}
            key={index}>
            <Checkbox
              status={data[currentElementId] ? 'checked' : 'unchecked'}
            />
            <Text>{item?.content}</Text>
          </TouchableOpacity>
        );
      case 'RadioButton':
        return (
          <RadioButton.Group
          // onValueChange={newValue => setValue(newValue)}
          // value={value}
          >
            {item?.values?.map(item => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={{borderWidth: 1, borderRadius: 50}}>
                    <RadioButton value={item} />
                  </TouchableOpacity>
                  <Text>{item}</Text>
                </View>
              );
            })}
          </RadioButton.Group>
        );
      case 'barGraph':
        return (
          <View
            style={{
              // flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <VictoryChart theme={VictoryTheme.grayscale} domainPadding={10}>
              <VictoryLabel
                text="revenue"
                x={200}
                y={290}
                textAnchor="middle"
                style={{fontWeight: 'bold'}}
              />
              <VictoryLabel
                text="years"
                x={10}
                y={140}
                textAnchor="middle"
                verticalAnchor="middle"
                angle={-90}
                style={{fontWeight: 'bold', margin: 10}}
              />
              <VictoryBar
                data={item.values}
                alignment="middle"
                labels={({datum}) => datum.label}
              />
            </VictoryChart> */}
            <VictoryChart
              theme={VictoryTheme.grayscale}
              domainPadding={{x: 20, y: 20}}>
              <VictoryLabel
                text={`${item.xAxisLabel}`}
                x={200}
                y={290}
                textAnchor="middle"
                style={{fontWeight: '600'}}
              />
              <VictoryLabel
                text={`${item.yAxisLabel}`}
                x={10}
                y={140}
                textAnchor="middle"
                verticalAnchor="middle"
                angle={-90}
                style={{fontWeight: '600'}}
              />
              <VictoryBar
                categories={item.categories}
                data={item.values}
                style={{
                  labels: {
                    fontSize: 14,
                  },
                }}
              />
              <VictoryAxis
                tickCount={data.length}
                style={{
                  tickLabels: {
                    fontSize: 8, // Adjust the font size as desired
                    padding: 5, // Adjust the padding as desired
                    angle: 20, // Adjust the rotation angle as desired
                    textAnchor: 'start', // Adjust the text anchor as desired
                  },
                }}
              />
              <VictoryAxis dependentAxis />
            </VictoryChart>
          </View>
        );
      case 'pieChart':
        return (
          <View style={{alignItems: 'center'}}>
            <VictoryPie
              data={item.values}
              labels={({datum}) => `${datum.x}\n${datum.y}%`}
            />
            <Text style={{fontSize: 14, fontWeight: '600'}}>
              {item.chatTitile}
            </Text>
          </View>
        );
      case 'lineGraph':
        return (
          <View style={{}}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine
                style={{
                  data: {stroke: '#c43a31'},
                  parent: {border: '1px solid #ccc'},
                }}
                data={item.values}
              />
            </VictoryChart>
          </View>
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
              renderComponent(
                element,
                index,
                currentElementId + '.elements' + `[${index}]`,
              ),
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
