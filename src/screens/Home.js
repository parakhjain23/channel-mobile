import {
  View,
  Text,
  useWindowDimensions,
  Linking,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import RenderHTML from 'react-native-render-html/src/RenderHTML';
import {Checkbox, RadioButton, TextInput} from 'react-native-paper';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
  VictoryTheme,
} from 'victory-native';

let JSON = [
  {type: 'html', value: '<h1>hello</h1>'},
  {type: 'plain_text', value: 'hello'},
  {type: 'button', value: 'hello'},
  {type: 'divider'},
  {type: 'text_area'},
  {
    type: 'image',
    url: 'https://photos.prnewswire.com/prnfull/20150402/10119680',
    width: 90,
    height: 50,
  },
  {
    type: 'radio_buttons',
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
  {
    type: 'checkboxes',
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
    type: 'input',
    value: 'Last Name',
    label: 'Name',
    placeholder: 'Last Name',
    action_id: 'lname',
  },
  {
    type: 'form',
    action_id: 'form',
    elements: [
      {
        type: 'image',
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
        type: 'section',
        elements: [
          {
            type: 'checkboxes',
            options: [
              {
                type: 'plain_text',
                value: 'first hai',
                selected: true,
              },
              {
                type: 'plain_text',
                value: 'Second',
              },
            ],
            action_id: 1112,
          },
        ],
      },
      {
        type: 'button',
        value: 'Submit',
        action_id: 'button',
      },
    ],
  },
  {
    type: 'card',
    elements: [
      {
        type: 'section',
        elements: [
          {
            type: 'radio_buttons',
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
        type: 'button',
        value: 'Submit',
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
      {x: 'halfKg', y: 5},
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
  const [value, setValue] = React.useState({});
  console.log(data, '=-=-=');

  const handleChekboxesToggle = (action_id, name) => {
    setData(prevData => ({
      ...prevData,
      [action_id]: {
        ...prevData[action_id],
        [name]: !prevData[action_id]?.[name] || false,
      },
    }));
  };

  const handleradio_buttonsToggle = (action_id, name) => {
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
      case 'quill':
      case 'html':
        return (
          <RenderHTML
            source={{
              html: item?.value,
            }}
            contentWidth={width}
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

      case 'button':
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

      case 'section':
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

      case 'checkboxes':
        return item?.options?.map((element, elementIndex) => {
          if (typeof data[item?.action_id] === 'undefined') {
            setData(prevData => ({
              ...prevData,
              [item.action_id]: {
                ...prevData[item.action_id],
                [element.value]: element.selected || false,
              },
            }));
          }

          return (
            <TouchableOpacity
              onPress={() =>
                handleChekboxesToggle(item?.action_id, element?.value)
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

      case 'radio_buttons':
        return (
          <RadioButton.Group
            onValueChange={value =>
              handleradio_buttonsToggle(item?.action_id, value)
            }
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

      case 'image':
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
            multiline={item?.multiline || false}
            mode="outlined"
            label={item?.label || ''}
            placeholder={item?.placeholder || 'Input'}
            onChangeText={text => onChange(item?.action_id, text)}
          />
        );

      case 'text_area':
        return (
          <TextInput
            multiline={true}
            mode="outlined"
            label={item?.label || ''}
            placeholder={item?.placeholder || 'Write something'}
            onChangeText={text => onChange(item?.action_id, text)}
          />
        );
        return (
          <TextInput
            mode="outlined"
            label={item?.label || ''}
            placeholder={item?.placeholder || ''}
            onChangeText={text => onChange(item?.action_id, text)}
          />
        );

      case 'card':
        return (
          <View style={styles.cardContainer}>
            {item?.elements?.map((element, index) =>
              renderComponent(element, index),
            )}
          </View>
        );

      case 'divider':
        return <View style={styles.divider} />;

      case 'barGraph':
        return (
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
        );
      case 'pieChart':
        return (
          <View>
            <VictoryPie
              data={item.values}
              labels={({datum}) => `${datum.x}\n${datum.y}%`}
            />
            <Text
              style={{fontSize: 14, fontWeight: '600', textAlign: 'center'}}>
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
  divider: {
    height: 0.5,
    backgroundColor: 'gray',
    marginVertical: 10,
  },
});
