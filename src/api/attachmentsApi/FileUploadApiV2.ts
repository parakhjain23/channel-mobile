import uuid from 'react-native-uuid';
import { spaceServerApi } from '../../../INTERCEPTOR';
export const FileUploadApi = async (Files:Array<[]>) => {
  const fileNames = Files?.map(item => {
    const folder = uuid.v4();
    return `${folder}/${item?.name || item?.fileName}`;
  });
  try {
    const presignedUrl = await spaceServerApi.post(`/chat/fileUpload`, JSON.stringify({fileNames: fileNames}));
    const Genereated_URL = presignedUrl?.data;
    const signedUrls = Object.values(Genereated_URL);
    const uploadPromises = signedUrls.map(async (s3BucketUrl, index) => {
      const fileUri = await fetch(Files[index]?.uri);
      const imageBody = await fileUri.blob();
      const fileType = Files[index]?.type;
      await UploadDocumentApi(s3BucketUrl, fileType, imageBody);
      return fileNames[index];
    });
    const uploadedFileNames = await Promise.all(uploadPromises);
    return uploadedFileNames;
  } catch (error) {
    console.warn(error, 'error in file uplloadi');
    return null;
  }
};

const UploadDocumentApi = async (s3BucketUrl:string, fileType:string, imageBody:{}) => {
  try {
    await fetch(s3BucketUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': fileType,
      },
      body: imageBody,
    });
  } catch (error) {
    console.warn(error, 'error in uploadDocumentApi');
  }
};
