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
import {BarChart, LineChart, PieChart} from 'react-native-chart-kit';

let JSON = [
  // {type: 'html', value: '<h1>hello</h1>'},
  // {type: 'plain_text', value: 'hello'},
  // {type: 'button', value: 'hello'},
  // {type: 'divider'},
  // {type: 'text_area'},
  // {
  //   type: 'image',
  //   url: 'https://photos.prnewswire.com/prnfull/20150402/10119680',
  //   width: 90,
  //   height: 50,
  // },
  // {
  //   type: 'radio_buttons',
  //   value: 'Protein',
  //   options: [
  //     {
  //       type: 'plain_text',
  //       value: 'Protein',
  //     },
  //     {
  //       type: 'plain_text',
  //       value: 'Carbs',
  //     },
  //   ],
  //   action_id: 567,
  // },
  // {
  //   type: 'checkboxes',
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
  // {
  //   type: 'input',
  //   value: 'Last Name',
  //   label: 'Name',
  //   placeholder: 'Last Name',
  //   action_id: 'lname',
  // },
  // {
  //   type: 'form',
  //   action_id: 'form',
  //   elements: [
  //     {
  //       type: 'image',
  //       url: 'https://photos.prnewswire.com/prnfull/20150402/10119680',
  //       width: 90,
  //     },
  //     {
  //       type: 'input',
  //       value: 'First Name',
  //       label: 'Name',
  //       placeholder: 'First Name',
  //       action_id: 'fname',
  //     },
  //     {
  //       type: 'input',
  //       value: 'Last Name',
  //       label: 'Name',
  //       placeholder: 'Last Name',
  //       action_id: 'lname',
  //     },
  //     {
  //       type: 'section',
  //       elements: [
  //         {
  //           type: 'checkboxes',
  //           options: [
  //             {
  //               type: 'plain_text',
  //               value: 'first hai',
  //               selected: true,
  //             },
  //             {
  //               type: 'plain_text',
  //               value: 'Second',
  //             },
  //           ],
  //           action_id: 1112,
  //         },
  //       ],
  //     },
  //     {
  //       type: 'button',
  //       value: 'Submit',
  //       action_id: 'button',
  //     },
  //   ],
  // },
  // {
  //   type: 'card',
  //   elements: [
  //     {
  //       type: 'section',
  //       elements: [
  //         {
  //           type: 'radio_buttons',
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
  //       type: 'button',
  //       value: 'Submit',
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
  //   type: 'barGraph',
  //   default: true,
  //   values: {
  //     datasets: [
  //       {
  //         data: ['5', '15', '5', '25', '10', '5', '15', '5'],
  //       },
  //     ],
  //     labels: [
  //       'MSG90',
  //       'MSG91',
  //       'MSG92',
  //       'MSG93',
  //       'MSG94',
  //       'MSG95',
  //       'MSG96',
  //       'MSG97',
  //     ],
  //   },
  //   options: {
  //     responsive: true,
  //     scales: {
  //       y: {
  //         title: {
  //           display: 'true',
  //           text: 'Revenue in Cr',
  //         },
  //       },
  //       x: {
  //         title: {
  //           display: 'true',
  //           text: 'time in year',
  //         },
  //       },
  //     },
  //   },
  // },
  {
    type: 'pieChart',
    values: {
      datasets: [
        {
          data: [30, 20, 15, 35, 5],
        },
      ],
      labels: ['MSG91', 'Gidh', 'SPACE', 'halfKg', 'halfKg'],
    },
  },
  // {
  //   type: 'lineGraph',
  //   values: {
  //     datasets: [
  //       {
  //         data: [2, 3, 5, 4, 7],
  //       },
  //     ],
  //     labels: [1, 2, 3, 4, 5],
  //   },
  // },
  // {
  //   type: 'pieChart',
  //   values: [
  //     {x: 'MSG91', y: 30},
  //     {x: 'Gidh', y: 20},
  //     {x: 'SPACE', y: 15},
  //     {x: 'halfKg', y: 35},
  //     {x: 'halfKg', y: 5},
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
];

const Home = () => {
  const [data, setData] = useState({});
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
    setData(prevData => ({
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
                handleChekboxesToggle(
                  item?.action_id || element?.value || 'checkboxes',
                  element?.value,
                )
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
              handleradio_buttonsToggle(
                item?.action_id || 'radio_buttons',
                value,
              )
            }
            value={data[item?.action_id]}>
            <View>
              {item?.options?.map(element => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      handleradio_buttonsToggle(
                        item?.action_id || 'radio_buttons',
                        element?.value,
                      )
                    }
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton value={element?.value} />
                    <Text>{element?.value}</Text>
                  </TouchableOpacity>
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
            onChangeText={text =>
              onChange(item?.action_id || item?.label || 'input', text)
            }
          />
        );

      case 'text_area':
        return (
          <TextInput
            multiline={true}
            mode="outlined"
            label={item?.label || ''}
            placeholder={item?.placeholder || 'Write something'}
            onChangeText={text =>
              onChange(item?.action_id || item?.label || 'text_area', text)
            }
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

      // case 'barGraph':
      //   return (
      //     <View style={styles.chartContainer}>
      //       <VictoryChart
      //         theme={VictoryTheme.grayscale}
      //         domainPadding={{x: 20, y: 20}}>
      //         <VictoryLabel
      //           text={`${item.xAxisLabel}`}
      //           x={200}
      //           y={290}
      //           textAnchor="middle"
      //           style={{fontWeight: '600'}}
      //         />
      //         <VictoryLabel
      //           text={`${item.yAxisLabel}`}
      //           x={10}
      //           y={140}
      //           textAnchor="middle"
      //           verticalAnchor="middle"
      //           angle={-90}
      //           style={{fontWeight: '600'}}
      //         />
      //         <VictoryBar
      //           categories={item.categories}
      //           data={item.values}
      //           style={{
      //             labels: {
      //               fontSize: 14,
      //             },
      //           }}
      //           animate={{
      //             duration: 1000,
      //             onLoad: {duration: 500},
      //           }}
      //         />
      //         <VictoryAxis
      //           tickCount={data.length}
      //           style={{
      //             tickLabels: {
      //               fontSize: 8, // Adjust the font size as desired
      //               padding: 5, // Adjust the padding as desired
      //               angle: 20, // Adjust the rotation angle as desired
      //               textAnchor: 'start', // Adjust the text anchor as desired
      //             },
      //           }}
      //         />
      //         <VictoryAxis dependentAxis />
      //       </VictoryChart>
      //     </View>
      //   );

      case 'barGraph':
        const chartConfig = {
          backgroundGradientFrom: '#fff',
          backgroundGradientFromOpacity: 1,
          backgroundGradientTo: '#fff',
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          // useShadowColorFromDataset: false, // optional
        };
        return (
          <View style={[styles.chartContainer]}>
            <BarChart
              style={{}}
              data={item?.values}
              width={width - 50}
              height={250}
              yAxisLabel="$"
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientFromOpacity: 1,
                backgroundGradientTo: '#fff',
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 1, // optional, default 3
                barPercentage: 0.5,
                fillShadowGradientFromOffset: 100,
                fillShadowGradient: 'black',
                fillShadowGradientOpacity: 1,
                fillShadowGradientTo: '#000',
                fillShadowGradientToOffset: 100,
              }}
              fromZero={true}
              // withCustomBarColorFromData={true}
              // segments={5}
              verticalLabelRotation={30}
              showBarTops={false}
              showValuesOnTopOfBars={true}
            />
          </View>
        );
      case 'pieChart':
        return (
          <View style={styles.chartContainer}>
            <PieChart
              data={convertData(item.values)}
              width={width}
              height={250}
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientFromOpacity: 1,
                backgroundGradientTo: '#fff',
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 2,
                barPercentage: 0.5,
              }}
              accessor={'population'}
              backgroundColor={'transparent'}
              paddingLeft={'15'}
              center={[0.5, 0.5]} // Adjust the center coordinates within the range of [0, 1]
              absolute
            />
          </View>
        );

      case 'lineGraph':
        return (
          <View style={styles.chartContainer}>
            {/* <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine
                style={{
                  data: {stroke: '#c43a31'},
                  parent: {border: '1px solid #ccc'},
                }}
                // width={300}
                data={item.values}
                interpolation="natural"
                animate={{
                  duration: 1000,
                  onLoad: {duration: 700},
                }}
              />
            </VictoryChart> */}
            <LineChart
              data={item.values}
              width={width}
              height={220}
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientFromOpacity: 1,
                backgroundGradientTo: '#fff',
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 1, // optional, default 3
              }}
            />
          </View>
        );

      default:
        return null;
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{marginHorizontal: 20, backgroundColor: 'white'}}>
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
    backgroundColor: 'white',
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
  chartContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
    alignItems: 'center',
  },
});
const convertData = inputData => {
  const {datasets, labels} = inputData;

  const convertedData = datasets[0].data.map((dataValue, index) => {
    return {
      name: labels[index],
      population: dataValue,
      color: getRandomColor(),
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    };
  });

  return convertedData;
};
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
