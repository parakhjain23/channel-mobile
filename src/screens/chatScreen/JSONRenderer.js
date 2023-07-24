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
import {BarChart, LineChart, PieChart} from 'react-native-chart-kit';

// let JSON_Example = [
//   // {type: 'html', value: '<h1>hello</h1>'},
//   // {type: 'plain_text', value: 'hello'},
//   // {type: 'button', value: 'hello'},
//   // {type: 'divider'},
//   // {type: 'text_area'},
//   // {
//   //   type: 'image',
//   //   url: 'https://photos.prnewswire.com/prnfull/20150402/10119680',
//   //   width: 90,
//   //   height: 50,
//   // },
//   // {
//   //   type: 'radio_buttons',
//   //   value: 'Protein',
//   //   options: [
//   //     {
//   //       type: 'plain_text',
//   //       value: 'Protein',
//   //     },
//   //     {
//   //       type: 'plain_text',
//   //       value: 'Carbs',
//   //     },
//   //   ],
//   //   action_id: 567,
//   // },
//   // {
//   //   type: 'checkboxes',
//   //   value: 'Protein',
//   //   options: [
//   //     {
//   //       type: 'plain_text',
//   //       value: 'first',
//   //     },
//   //     {
//   //       type: 'plain_text',
//   //       value: 'Second',
//   //     },
//   //   ],
//   //   action_id: 123,
//   // },
//   // {
//   //   type: 'input',
//   //   value: 'Last Name',
//   //   label: 'Name',
//   //   placeholder: 'Last Name',
//   //   action_id: 'lname',
//   // },
//   {
//     type: 'form',
//     action_id: 'form',
//     elements: [
//       {
//         type: 'image',
//         url: 'https://photos.prnewswire.com/prnfull/20150402/10119680',
//         width: 90,
//       },
//       {
//         type: 'input',
//         value: 'First Name',
//         label: 'Name',
//         placeholder: 'First Name',
//         action_id: 'fname',
//       },
//       {
//         type: 'input',
//         value: 'Last Name',
//         label: 'Name',
//         placeholder: 'Last Name',
//         action_id: 'lname',
//       },
//       {
//         type: 'section',
//         elements: [
//           {
//             type: 'checkboxes',
//             options: [
//               {
//                 type: 'plain_text',
//                 value: 'first hai',
//                 selected: true,
//               },
//               {
//                 type: 'plain_text',
//                 value: 'Second',
//               },
//             ],
//             action_id: 1112,
//           },
//         ],
//       },
//       {
//         type: 'button',
//         value: 'Submit',
//         action_id: 'button',
//       },
//     ],
//   },
//   {
//     type: 'card',
//     elements: [
//       {
//         type: 'section',
//         elements: [
//           {
//             type: 'radio_buttons',
//             value: 'Protein',
//             options: [
//               {
//                 type: 'plain_text',
//                 value: 'Protein',
//               },
//               {
//                 type: 'plain_text',
//                 value: 'Carbs',
//               },
//             ],
//             action_id: 567,
//           },
//         ],
//       },
//       {
//         type: 'button',
//         value: 'Submit',
//       },
//     ],
//   },
//   {
//     type: 'barGraph',
//     default: true,
//     values: {
//       datasets: [
//         {
//           data: ['5', '15', '5', '25', '10', '5', '15', '5'],
//         },
//       ],
//       labels: [
//         'MSG90',
//         'MSG91',
//         'MSG92',
//         'MSG93',
//         'MSG94',
//         'MSG95',
//         'MSG96',
//         'MSG97',
//       ],
//     },
//     options: {
//       responsive: true,
//       scales: {
//         y: {
//           title: {
//             display: 'true',
//             text: 'Revenue in Cr',
//           },
//         },
//         x: {
//           title: {
//             display: 'true',
//             text: 'time in year',
//           },
//         },
//       },
//     },
//   },
//   {
//     type: 'pieChart',
//     values: {
//       datasets: [
//         {
//           data: [30, 20, 15, 35, 5],
//         },
//       ],
//       labels: ['MSG91', 'Gidh', 'SPACE', 'halfKg', 'halfKg'],
//     },
//   },

//   {
//     type: 'lineGraph',
//     values: {
//       datasets: [
//         {
//           data: [2, 3, 5, 4, 7],
//         },
//       ],
//       labels: [1, 2, 3, 4, 5],
//     },
//   },
// ];

const JSONRenderer = ({JSON_Example}) => {
  const [data, setData] = useState({});
  // console.log(data, '=-=-=-');
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
      [action_id]: {
        ...prevData[action_id],
        [prevData[action_id].selectedRadioButton || name]: false,
        selectedRadioButton: name,
        [name]:
          (prevData[action_id]?.[name]
            ? prevData[action_id]?.[name]
            : !prevData[action_id]?.[name]) || false,
      },
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
        const onButtonPress = async buttonValue => {
          setData({});
          try {
            const response = await fetch(
              'https://ebl-api-h7duexlbuq-el.a.run.app/func/KIIWX0yC0W3U',
              {
                method: 'POST',
                body: JSON.stringify({
                  ...data,
                  [item.action_id || item?.value]: buttonValue || 'Submit',
                }),
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );
          } catch (error) {
            console.log(error, '=-=-error in api=');
          }
        };
        return (
          <View style={{flexShrink: 1}}>
            <Button
              title={item?.value || 'Submit'}
              onPress={() => {
                onButtonPress(item?.value);
              }}
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
              flexWrap: 'wrap', ///// Can be removed later
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
        let selectedRadioButtonLocal = null;
        return (
          <RadioButton.Group
            onValueChange={value =>
              handleradio_buttonsToggle(
                item?.action_id || 'radio_buttons',
                value,
              )
            }
            value={data[item?.action_id]?.selectedRadioButton}>
            <View>
              {item?.options?.map((element, index) => {
                if (element?.selected) {
                  selectedRadioButtonLocal = element?.value;
                }
                if (typeof data[item?.action_id] === 'undefined') {
                  setData(prevData => ({
                    ...prevData,
                    [item.action_id]: {
                      ...prevData[item.action_id],
                      selectedRadioButton: selectedRadioButtonLocal,
                      [element.value]: element.selected || false,
                    },
                  }));
                }
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() =>
                      handleradio_buttonsToggle(
                        item?.action_id || 'radio_buttons',
                        element?.value,
                      )
                    }
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <RadioButton
                      value={element?.value}
                      // status={
                      //   data?.[item?.action_id]?.[element?.value]
                      //     ? 'checked'
                      //     : 'unchecked'
                      // }
                    />
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
            value={data[item?.action_id] || ''}
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
            value={data[item?.action_id] || ''}
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
              width={width - 80}
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
              segments={5}
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
              width={width - 100}
              height={200}
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientFromOpacity: 1,
                backgroundGradientTo: '#fff',
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 2,
                barPercentage: 0.5,
              }}
              avoidFalseZero={true}
              accessor={'value'}
              backgroundColor={'transparent'}
              paddingLeft={'25'}
              center={[0, 0]} // Adjust the center coordinates within the range of [0, 1]
              // absolute
            />
          </View>
        );

      case 'lineGraph':
        return (
          <View style={styles.chartContainer}>
            <LineChart
              data={item.values}
              width={width - 40}
              height={220}
              chartConfig={{
                backgroundGradientFrom: '#fff',
                backgroundGradientTo: '#fff',
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                strokeWidth: 1, // optional, default 3
                propsForDots: {
                  r: '5',
                  strokeWidth: '1',
                  stroke: '#fff',
                },
              }}
              bezier
              style={{
                marginVertical: 8,
              }}
              renderDotContent={({x, y, index, indexData}) => (
                (uniqueKey = `dot-${indexData}-${index}-${Math.random()}`),
                (
                  <Text
                    key={uniqueKey}
                    style={{
                      position: 'absolute',
                      top: y - 20,
                      left: x - 10,
                      color: 'black',
                    }}>
                    {indexData}
                  </Text>
                )
              )}
              fromZero={true}
              segments={5}
            />
          </View>
        );

      default:
        return null;
    }
  };
  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={{marginHorizontal: 10, backgroundColor: 'white'}}>
        {JSON_Example.map((item, index) =>
          renderComponent(item, index, `[${index}]`),
        )}
      </View>
    </ScrollView>
  );
};

export default JSONRenderer;

const styles = StyleSheet.create({
  cardContainer: {
    minWidth: 300,
    justifyContent: 'center',
    padding: 10,
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
      value: dataValue,
      color: getRandomColor(index),
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    };
  });

  return convertedData;
};
const getRandomColor = index => {
  const COLORS = [
    'cyan',
    'tomato',
    'magenta',
    'blue',
    'gray',
    'green',
    'orange',
    'purple',
    'red',
    'yellow',
    'black',
    'pink',
    '#FFCC00', // Custom hexadecimal color
    '#00FF00', // Custom hexadecimal color
  ];
  return COLORS[index % COLORS.length];
};
