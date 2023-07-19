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
  const renderElement = element => {
    switch (element.type) {
      case 'html':
        return <Text>{element.value}</Text>;
      case 'plain_text':
        return <Text>{element.value}</Text>;
      case 'button':
        return (
          <Button
            title={element.value}
            onPress={() => handleButtonPress(element)}
          />
        );
      case 'divider':
        return <View style={styles.divider} />;
      case 'text_area':
        return <TextInput multiline={true} />;
      case 'image':
        return (
          <Image
            source={{uri: element.url}}
            style={{width: element.width, height: element.height}}
          />
        );
      case 'radio_buttons':
        return (
          <View style={styles.radioButtonsContainer}>
            {element.options.map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioButton}
                onPress={() =>
                  handleRadioButtonPress(element.action_id, option.value)
                }>
                <Text>{option.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'checkboxes':
        return (
          <View style={styles.checkboxesContainer}>
            {element.options.map(option => (
              <TouchableOpacity
                key={option.value}
                style={styles.checkbox}
                onPress={() =>
                  handleCheckboxPress(element.action_id, option.value)
                }>
                <Text>{option.value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        );
      case 'input':
        return <TextInput placeholder={element.placeholder} />;
      case 'form':
        return (
          <View style={styles.form}>
            {element.elements.map(formElement => (
              <View key={formElement.action_id} style={styles.formElement}>
                {renderElement(formElement)}
              </View>
            ))}
          </View>
        );
      case 'card':
        return (
          <View style={styles.card}>
            {element.elements.map(cardElement => (
              <View key={cardElement.action_id} style={styles.cardElement}>
                {renderElement(cardElement)}
              </View>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  const handleButtonPress = element => {
    // Handle button press event
    console.log('Button pressed:', element.value);
  };

  const handleRadioButtonPress = (actionId, value) => {
    // Handle radio button press event
    console.log('Radio button pressed:', actionId, value);
  };

  const handleCheckboxPress = (actionId, value) => {
    // Handle checkbox press event
    console.log('Checkbox pressed:', actionId, value);
  };

  return (
    <ScrollView>
      <View style={{marginHorizontal: 20, backgroundColor: 'white'}}>
        {JSON.map((item, index) => renderElement(element, index))}
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  radioButtonsContainer: {
    flexDirection: 'row',
  },
  radioButton: {
    marginRight: 10,
  },
  checkboxesContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    marginRight: 10,
  },
  form: {
    marginVertical: 10,
  },
  formElement: {
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  cardElement: {
    marginBottom: 10,
  },
});
// const styles = StyleSheet.create({
//   cardContainer: {
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: 'white',
//     marginVertical: 5,
//     borderRadius: 10,
//     shadowColor: 'black',
//     shadowRadius: 5,
//     shadowOpacity: 0.2,
//     shadowOffset: {
//       width: 0,
//       height: 3,
//     },
//     elevation: 5,
//   },
//   divider: {
//     height: 0.5,
//     backgroundColor: 'gray',
//     marginVertical: 10,
//   },
//   chartContainer: {
//     backgroundColor: 'white',
//     marginVertical: 5,
//     alignItems: 'center',
//   },
// });
