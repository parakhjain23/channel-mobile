import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import PdfThumbnail from 'react-native-pdf-thumbnail';

export const PdfPreview = ({filePath}) => {
  const [imageUri, setImageUri] = useState('');
  useEffect(() => {
    if (filePath)
      (async () => {
        const result = await PdfThumbnail.generate('file://' + filePath, 0, 0);
        if (result.uri) setImageUri(result.uri);
      })();
  }, []);
  return (
    imageUri != '' && (
      <FastImage
        source={{uri: imageUri}}
        resizeMode="cover"
        style={{
          height: 100,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      />
    )
  );
};
