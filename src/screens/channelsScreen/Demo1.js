import {text} from 'cheerio/lib/api/manipulation';
import React, {useEffect, useRef, useState} from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import QuillEditor, {QuillToolbar} from 'react-native-cn-quill';
import HTMLView from 'react-native-htmlview';
import {QuillDeltaToHtmlConverter} from 'quill-delta-to-html';
import {RenderHTML} from 'react-native-render-html';
import Delta from 'quill-delta';

const Demo1 = () => {
  const _editor = useRef();
  const [htmlText, sethtmlText] = useState('');
  const handleHtml = data => {
    // sethtmlText(data);
  };
  const {width} = useWindowDimensions();
  const handleText = data => {
    console.log(data);
    sethtmlText(data);
  };

  const convert = async data => {
    const content = await _editor?.current?.getContents();
    console.log(content, 'ed');
    var converter = new QuillDeltaToHtmlConverter(content.ops, {});
    var html = converter.convert();
    console.log(html, '0-0-0-0');
  };
  return (
    <SafeAreaView style={styles.root}>
      {/* <RenderHTML source={{html: demo}} contentWidth={width} /> */}
      <Button
        title="press to convert to html"
        onPress={() => convert(htmlText)}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          backgroundColor: 'red',
          width: '100%',
          height: 100,
          maxHeight: 300,
        }}>
        <QuillEditor
          style={styles.editor}
          ref={_editor}
          initialHtml=""
          onHtmlChange={handleHtml}
          onTextChange={handleText}
        />
        <QuillToolbar editor={_editor} options="basic" theme="light" />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  root: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#eaeaea',
  },
  editor: {
    flex: 1,
    width: '100%',
    // height: '100%',
    padding: 0,
    borderColor: 'gray',
    borderWidth: 1,
    // marginHorizontal: 30,
    // marginVertical: 5,
    backgroundColor: 'white',
    // maxHeight: '50%',
  },
});
export default Demo1;
