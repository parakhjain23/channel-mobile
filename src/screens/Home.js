import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Button,
  Linking,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import RenderHTML from 'react-native-render-html';
import {Checkbox, RadioButton} from 'react-native-paper';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryHistogram,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
} from 'victory-native';

const JSON = [
  {
    type: 'quill',
    content: '<h1>heading</h1><p>My Name is Parakh Jain. Text from quilll</p>',
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
      {
        type: 'plain_text',
        content: 'this buttons are in section block',
      },
    ],
  },
  {
    type: 'barGraph',
    values: [
      {x: 'MSG90', y: '5', label: '100cr'},
      {x: 'MSG91', y: '15', label: '100cr'},
      {x: 'MSG92', y: '5', label: '100cr'},
      {x: 'MSG93', y: '25', label: '100cr'},
      {x: 'MSG94', y: '10', label: '100cr'},
      {x: 'MSG95', y: '5', label: '100cr'},
      {x: 'MSG96', y: '5', label: '100cr'},
      {x: 'MSG97', y: '5', label: '100cr'},
    ],
    categories: {
      x: ['MSG90', 'MSG91', 'MSG92', 'MSG93', 'MSG94'],
      y: ['5', '10', '15', '20', '25'],
    },
    xAxisLabel: 'revenue in Cr.',
    yAxisLabel: 'time in Years',
  },
  {
    type: 'pieChart',
    values: [
      {x: 'MSG91', y: 30},
      {x: 'Gidh', y: 20},
      {x: 'SPACE', y: 15},
      {x: 'halfKg', y: 35},
    ],
    chatTitile: 'year 2023 contributions',
  },
  {
    type: 'lineGraph',
    values: [
      {x: 1, y: 2},
      {x: 2, y: 3},
      {x: 3, y: 5},
      {x: 4, y: 4},
      {x: 5, y: 7},
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
    console.log(item);
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

      case 'section':
        console.log('first', '-=');
        return (
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {item?.elements?.map((element, elementIndex) =>
              renderComponent(element, elementIndex),
            )}
          </View>
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
            <TouchableOpacity
              style={{borderColor: 'black', borderWidth: 1, borderRadius: 30}}>
              <Checkbox
                status={data[index] ? 'checked' : 'unchecked'}
                onPress={() => handleCheckboxToggle(index)}
              />
            </TouchableOpacity>
          </View>
        );
      case 'radioBtn':
        return (
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            {item?.values?.map(item => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={{borderWidth: 1, borderRadius: 50}}>
                    <RadioButton value={item} />
                  </TouchableOpacity>
                  <Text>{item}</Text>
                </View>
              );
              console.log(item, '=-=-=');
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
      default:
        return null;
    }
  };
  return (
    <ScrollView style={{marginHorizontal: 5}}>
      {JSON.map((item, index) => renderComponent(item, index))}
    </ScrollView>
  );
};

export default Home;
